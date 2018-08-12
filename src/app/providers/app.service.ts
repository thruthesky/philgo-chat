import { Injectable, NgZone } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/messaging';
import {
  ApiChatRoom, ApiChatMessage, PhilGoApiService, CHAT_STATUS_ENTER, CHAT_STATUS_LEAVE, ERROR_WRONG_SESSION_ID,
  ERROR_WRONG_IDX_MEMBER
} from '../modules/philgo-api-v3/philgo-api.service';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LanguageTranslate } from '../modules/language-translate/language-translate';



declare let FCMPlugin;

const firebaseConfig = {
  apiKey: 'AIzaSyA1X3vpzSpUk_JHCbNjEwQe1-pduF0Enqs',
  authDomain: 'philgo-64b1a.firebaseapp.com',
  databaseURL: 'https://philgo-64b1a.firebaseio.com',
  projectId: 'philgo-64b1a',
  storageBucket: 'philgo-64b1a.appspot.com',
  messagingSenderId: '675064809117'
};
firebase.initializeApp(firebaseConfig);


@Injectable({
  providedIn: 'root'
})
export class AppService {

  db: firebase.database.Reference = firebase.database().ref('/');
  messaging: firebase.messaging.Messaging = null;

  listeningRooms: Array<ApiChatRoom> = [];
  currentRoomNo = 0;

  newMessageOnCurrentRoom = new Subject<ApiChatMessage>();


  private firebaseEvent: firebase.database.EventType = 'value';

  private countToastMessage = 0;


  /**
   * Becareful!
   *
   * this.a.platform is a string. not ionic angular api object.
   *
   */
  platform: 'web' | 'cordova' = 'web';

  /**
   * Cordova token
   */
  pushToken = null;

  /**
   * If the user visits other than rooms list page, it will be false.
   * Especially if user visits chat room page fist, before visiting chat rooms list page,
   *  the app needs to reload the site into rooms page when the user leave the room to completely remove the page
   *  from the bottom of the nativation stack.
   */
  roomsPageVisited = false;
  //
  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly ngZone: NgZone,
    private readonly router: Router,
    private readonly toastController: ToastController,
    private readonly philgo: PhilGoApiService,
    public readonly tr: LanguageTranslate,
    platform: Platform
  ) {
    window['triggerToastMessageClick'] = this.onClickToastMessage.bind(this);
    console.log('isPushNotificationRequested: ', this.isPushNotificationPermissionRequested());

    platform.ready().then(() => {

      if (platform.is('cordova') || this.platform === 'cordova') {
        this.platform = 'cordova';
      } else {
        /**
         * Web 설정.
         *
         * Cordova 에서 firebase.messaging() 을 하면 에러 발생.
         */
        this.messaging = firebase.messaging();
        this.updatePushNotificationToken();
      }
      this.onInit();
    });


  }

  /**
   * Platform 초기화 되고 맨 처음 한번만 호출 된다.
   */
  onInit() {
    if (this.platform === 'web') {
      this.messaging.onMessage((payload) => {
        console.log('Got FCM notification! Just ignore since app has toast.');
      });
    } else if (this.platform === 'cordova') {
      FCMPlugin.getToken(token => {
        this.pushToken = token;
        this.updatePushNotificationTokenToServer(token);
      });
      FCMPlugin.onTokenRefresh(token => {
        this.pushToken = token;
        this.updatePushNotificationTokenToServer(token);
      });

      FCMPlugin.onNotification((data) => {
        if (data.wasTapped) {
          // Notification was received on device tray and tapped by the user.
          // alert('data was Tapped by user: ' + JSON.stringify(data));
        } else {
          // Notification was received in foreground. Maybe the user needs to be notified.
          // alert('data was received in foreground: ' + JSON.stringify(data));
        }
      });

    }
  }

  /**
   * 로그인을 하면 항상 이곳이 호출된다.
   */
  onLogin() {
    this.updatePushNotificationToken();
  }
  /**
   * 회원 가입을 하면 항상 이 함수가 호출된다.
   */
  onRegister() {
    this.updatePushNotificationToken();
  }
  /**
   * 회원 정보 수정을 하면 항상 이 함수가 호출된다.
   */
  onProfileUpdate() {
    this.updatePushNotificationToken();
  }
  /**
   * 회원 로그아웃을 하면 항상 이 함수가 호출된다.
   */

  onLogout() {
    this.updatePushNotificationToken();
  }

  version(): string {
    return '0.1';
  }

  /**
   *
   * @param o string or object.
   *  if it is an object,
   *    {
   *      code: number,   // if code is not 0, it means, error.
   *      message: string,
   *      closeButtonText: string   // customize close button text.
   *      duration: number          // ms. default is 10000(10s). you can put it big number for test.
   *    }
   *
   * @example
      e.duration = 100000;
      this.a.toast(e);

   * @description If the toast is an error toast
   *    <ion-toast class="error errorNO"> will be added in class.
   *    Normally error code is like -1234, so, the error class will be 'error error-1324'
   */
  async toast(o: any) {
    // console.log('o: ', o);
    if (typeof o === 'string') {
      console.log('o is tring');
      o = {
        message: o
      };
    }
    if (o.closeButtonText === void 0) {
      o.closeButtonText = this.tr.t({ko: '닫기', en: 'Close'});
    }
    if (o.duration === void 0) {
      o.duration = 10000;
    }
    if (typeof o.code !== void 0 && o.code) {
      /**
       * If session id is invalid.
       */
      if (o.code === ERROR_WRONG_SESSION_ID || o.code === ERROR_WRONG_IDX_MEMBER) {
        this.philgo.logout();
      }
      o.cssClass = `error error${o.code}`;
    }
    o.showCloseButton = true;
    // console.log('o: ', o);
    const toast = await this.toastController.create(o);
    toast.present();
  }

  /**
   * Show a message on top of app.
   *
   * Use this method to display a chat message on top of the app when the user is not in the chat room of the message.
   *
   * @desc This method should not invoked when
   *    - if it's my message.
   *    - i am in the room of the chat message.
   *
   * @param o This value is comming from firebase.on( '/chat/room/.../last-message', => snapshot.
   *    so, this has be defaut,
   *  {
   *    idx: api_chat_message.idx,
   *    idx_chat_room: api_chat_room.idx,
   *    idx_member: sf_member.idx,
   *    message: message to show,
   *    name: name of the user.
   *    photoUrl: photo url of the user.
   *    stamp: of the message.
   *  }
   */
  async toastMessage(o: ApiChatMessage | any) {
    console.log('toastMessage: ', o);
    if (!o) {
      return;
    }
    if (o.closeButtonText === void 0) {
      o.closeButtonText = 'Close';
    }
    if (o.duration === void 0) {
      o.duration = 7000;
    }

    const toastClass = 'toast-' + (++this.countToastMessage);
    o.cssClass = 'new-chat-message ' + toastClass;
    o.position = 'top';
    o.showCloseButton = true;


    if (o.message === void 0 || !o.message) {
      o['message'] = ' ';
    }
    if (o.type !== void 0 && o.type.match('image.*')) {
      o['message'] = ` has uploaded a photo.`;
    }

    // console.log('o: ', o);
    const toast = await this.toastController.create(o);
    await toast.present();
    const el: Element = document.querySelector('.' + toastClass + ' .toast-message');
    if (el) {
      let innerHTML = '';
      innerHTML += `<div class="custom-message" onclick="triggerToastMessageClick(${o.idx_chat_room}, '${toastClass}')">`;
      if (o.photoUrl !== void 0 && o.photoUrl) {
        innerHTML += ` <img src="${o.photoUrl}">`;
      } else {
        innerHTML += ` <span class="name">${o.name}</span>`;
      }
      innerHTML += `<span>${el.innerHTML}</span></div>`;
      el.innerHTML = innerHTML;
    }
  }
  onClickToastMessage(idx_chat_room, toastClass) {
    console.log('onClickToastMessage() idx_chat_room: ', idx_chat_room, toastClass);
    const el = document.querySelector('.' + toastClass);
    if (el['dismiss'] !== void 0 && typeof el['dismiss'] === 'function') {
      (<any>el).dismiss();
      this.router.navigateByUrl('/room/' + idx_chat_room);
    }
  }

  render(ms = 100, callback?) {
    setTimeout(() => {
      this.ngZone.run(() => { });
      if (callback) {
        setTimeout(() => callback(), 100);
      }
    }, ms);
  }

  /**
   * 방에 들어가는 경우, 그 방을 listen 한다. 이것은 로그인 회원이든 비 로그인 회원이든 그 방을 listen 한다.
   * 이미 listen 중에 있으면, 두번 listen 하지 않는다.
   *
   * It adds a room for listening new message.
   *
   * since it simply don't do anything if the room is already added, it is harmless you try to listen a room that is already by listened.
   *
   * @description It is needed when a user enters a room that is not his room.
   *    For instance,
   *      Case 1) when a user enters a new room, it needs to listen for new message for that room
   *      but the room is not being listened because it is not listed on my rooms page(in which page, it will listen all the user's rooms )
   *      so, it needs to call this method to add listener for that new room.
   *
   *      Case 2) when a user directly enters a room without visiting rooms page.
   *        WARNING: in this case, the user only can listen the entered room since he didn't visit my room page.
   *            This is not happening in normal case and not a big problem any way.
   *            This usually happens only on testing.
   *
   * @param room chat room
   */
  addRoomToListen(room: ApiChatRoom) {
    const i = this.listeningRooms.findIndex(v => v.idx === room.idx);
    if (i === -1) { // Not in the listeners array? This may be a new room for the user. Listen it!!
      console.log('Going to listen a room: ', room.name);
      this.listenRoom(room);
    } else { // the room is already being listened.
      console.log('The room is already listened. Maybe it is his old room.');
    }
  }
  /**
   * It listens new messages of my rooms.
   *
   * @description This may be called in many ways.
   *    - When user first visit my rooms page after app booted.
   *        Which means, my rooms page is at the bottom of navigation stack.
   *        In this case, when user visit all rooms page and visit back to my rooms page, this method will be called.
   *    - Whenever user visit my rooms page when my rooms page is not on the bottom of navigation stack.
   *        It needs to delete all my room and add new ones.
   *
   * @description
   *
   *    It may be reasonable to remove and listen all the rooms. Somehow I feel like the app should refresh room listenning.
   *
   * @param rooms my rooms
   */
  async listenMyRooms(rooms: Array<ApiChatRoom>) {
    if (!rooms) {
      return;
    }
    /**
     * Off(remove) all the event of old listening rooms.
     */
    for (const room of this.listeningRooms) {
      // console.log('Off: ', room.name);
      await this.db.child(`/chat/rooms/${room.idx}/last-message`).off(this.firebaseEvent, room['off']);
    }
    this.listeningRooms = [];
    /**
     * listen to my rooms
     */
    for (const room of rooms) {
      this.listenRoom(room);
    }
  }

  /**
   * If the user is not listening his rooms, he can call this method.
   *
   * 로그인을 한 사용자가, 전체 자기방을 Listen 하지 않았으면, 전체 listen 한다.
   *
   * User can call this method when he first access chat room page instead of chat rooms list page.
   *
   * If the user has visited before calling this method, then it simply don't listen his rooms.
   * If the user visits again on room list page, then, app will remove all the listeners and listens again for the user's room.
   */
  listenMyRoomsIfNotListenning() {
    if (this.philgo.isLoggedIn()) {
      if (this.listeningRooms.length === 0) {
        console.log('No rooms are listened, I am going to listen my rooms.');
        this.philgo.chatMyRoomList().subscribe(res => {
          this.listenMyRooms(res).then(() => {
          });
        });
      } else {
        console.log('My rooms are already listened.');
      }
    }
  }


  /**
   * Listens a room.
   *
   * 비 회원인 경우, 모든 방을 listen 하지 않는다.
   * 비 회원이 방에 들어가는 경우, listenMyRoomsIfNotListenning() 를 통해서 listen 하지도 않는다.
   *
   * If the room is already in listening, it double listens. and this is not good.
   *
   * So, do not use this method direcly. use this.addRoomToListen() which does not listen when the room is already listend.
   *
   * You can call any room to listen. Even if it's not your room.
   *
   * @param room chat room
   */
  listenRoom(room: ApiChatRoom) {
    console.log('On: ', room.name);
    room['off'] = this.db.child(`/chat/rooms/${room.idx}/last-message`).on(this.firebaseEvent, snapshot => {
      const message: ApiChatMessage = snapshot.val();

      console.log('listenRoom() => got listen: data: ', message);
      /**
       * Don't toast if I am opening rooms page ( or listening the room ) for the first time of app running.
       * If 'firstOpenning' is undefined, it is first message. define it and return it.
       */
      if (room['firstOpenning'] === void 0) {
        // console.log(`First time visiting on listening the room. Do not toast for the first message only. room: ${room.name}.`);
        room['firstOpenning'] = true;
        return;
      }

      if (!message) { // no chage message yet.
        console.log('No chat message in the chat room. just return');
        return;
      }

      // console.log(`AppService::listennMyRooms() got message in ${room.name} : `, message, ' at ', snapshot.ref.parent.key);

      /**
       * Don't toast if it's my message.
       */
      if (this.philgo.isMyChatMessage(message)) {
        return;
      }
      /**
       * Don't toast if I am in the same room of the message since it will be displayed on chat messgae box.
       */
      if (this.philgo.isMyCurrentChatRoomMessage(this.currentRoomNo, message)) {
        console.log('AppService::listenMyRooms():: got current room No. ', this.currentRoomNo, 'message. next()', message);
        this.newMessageOnCurrentRoom.next(message);
        return;
      }

      /**
       * 2018년 8월 6일. Firebase 로 방 입장/출장이 오지만 푸시는 되지 않는다.
       * If the message is one of my rooms' message and If I am not in the room, show it as a toast except
       *    If the message is not for enter or leave.
       */
      if (message.status === CHAT_STATUS_ENTER || message.status === CHAT_STATUS_LEAVE) {
        console.log('User is entering or leaving. No toast!!');
        return;
      }
      this.toastMessage(message);
    });
    this.listeningRooms.push(room);
  }

  /**
   * Returns number from string.
   * @param v value of number
   */
  number(v) {
    if (isNaN(v)) {
      return 0;
    } else {
      return parseInt(v, 10);
    }
  }


  safeUrl(url) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  isPushNotificationPermissionRequested() {
    // Let's check if the browser supports notifications
    if (!('Notification' in window) || Notification === void 0 || Notification['permission'] === void 0) {
      console.log('This browser does not support desktop notification');
      return false;
    }
    // console.log(`Notification['permission']`, Notification['permission']);
    return Notification['permission'] !== 'default';
  }
  isPushNotificationPermissionDenied() {
    if (this.isPushNotificationPermissionRequested()) {
      return Notification['permission'] === 'denied';
    } else {
      return false;
    }
  }
  isPushNotificationPermissionGranted() {
    if (this.isPushNotificationPermissionRequested()) {
      return Notification['permission'] === 'granted';
    } else {
      return false;
    }
  }

  /**
   * 웹 Notification
   *
   * 매번 실행시 실행시 호출 하면 된다.
   */
  updatePushNotificationToken() {
    console.log('updatePushNotificationToken()');

    if (this.platform === 'web') {
      console.log('  --> web');
      /**
       * 맨 처음에는 물어보고 해야 하므로, 부팅 할 때 토큰 업데이트하지 않고 (토큰 업데이트를 할 때, permission 을 자동으로 물어 봄 )
       * Permission 허용 했을 때만, 토큰 업데이트 확인을 한다.
       */
      if (this.isPushNotificationPermissionGranted()) {
        console.log('    --> request permission granted()');
        this.requestPushNotificationPermission();
      } else {
        console.log('    --> request permission NOT granted()');
      }
    } else if (this.platform === 'cordova') {
      this.updatePushNotificationTokenToServer(this.pushToken);
    }
  }
  /**
   *
   * 실제로 서버에 저장한다.
   *
   * 앱이든 웹이든 반드시 실행을 하면 이 함수가 호출된다.
   *
   * 그냥 매우 간단하게 !!!! 접속 할 때 마다 항상 서버에 저장한다.
   *
   * 맨 처음 접속할 때, 로그인을 한 다음에 접속하는 것이 좋다.
   *
   * @param token push notification token
   *
   */
  updatePushNotificationTokenToServer(token) {
    this.pushToken = token; // Cordova 는 이미 값이 있지만, 웹에는 적용을 해 준다.
    console.log('updatePushNotificationTokenToServer(): ', token);
    if (!token) {
      console.log('token empty. return.');
      return;
    }
    this.philgo.pushSaveToken({ token: token, domain: 'chat' }).subscribe(res => {
      console.log('pushSaveToken', res);
    }, e => {
      console.log('Error on pushSaveToken(): If the token exists, just ignore. It is not an error. ', e);
    });
  }
  /**
   * 매번 실행시 호출 하면 되지만, 맨 처음에는 rooms 페이지에서 한번 물어 보고 한다.
   */
  requestPushNotificationPermission() {
    console.log('requestPushNotificationPermission()');
    this.messaging.requestPermission().then(() => {
      console.log('   ===> Notification permission granted.');
      // TODO(developer): Retrieve an Instance ID token for use with FCM.
      // Callback fired if Instance ID token is updated.

      this.messaging.getToken().then(token => this.updatePushNotificationTokenToServer(token))
        .catch((err) => {
          console.log('getToken() error: ', err);
        });
      this.messaging.onTokenRefresh(() => {
        this.messaging.getToken().then((token => this.updatePushNotificationTokenToServer(token)))
          .catch((err) => {
            console.log('Unable to retrieve refreshed token ', err);
            // showToken('Unable to retrieve refreshed token ', err);
          });
      });
    }).catch((err) => {
      console.log('Unable to get permission to notify. User may have denied permission!', err);
    });
  }
}
