import { Injectable, NgZone, Output, EventEmitter } from '@angular/core';
import { ToastController, Platform, AlertController, NavController } from '@ionic/angular';
import * as firebase from 'firebase/app';
// import 'firebase/database';
import 'firebase/messaging';
import {
  ApiChatMessage, PhilGoApiService, ERROR_WRONG_SESSION_ID,
  ERROR_WRONG_IDX_MEMBER,
  ApiUserInformation
} from '../modules/philgo-api/philgo-api.service';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LanguageTranslate } from '../modules/language-translate/language-translate';
import { environment } from '../../environments/environment';
import { AngularLibrary } from '../modules/angular-library/angular-library';
import { AlertOptions } from '@ionic/core';


interface Environment {
  production: boolean;
  hmr: boolean;
  philgoServerUrl: string;
  philgoFileServerUrl: string;
  newFileServerUrl: string;
}

declare let FCMPlugin;

// const firebaseConfig = {
//   apiKey: 'AIzaSyA1X3vpzSpUk_JHCbNjEwQe1-pduF0Enqs',
//   authDomain: 'philgo-64b1a.firebaseapp.com',
//   databaseURL: 'https://philgo-64b1a.firebaseio.com',
//   projectId: 'philgo-64b1a',
//   storageBucket: 'philgo-64b1a.appspot.com',
//   messagingSenderId: '675064809117'
// };
// firebase.initializeApp(firebaseConfig);


@Injectable({
  providedIn: 'root'
})
export class AppService {

  @Output() chatRoomReminderClose = new EventEmitter();


  version = 2018081413;
  // info: ApiChatInfo = null;

  environment: Environment = environment;
  // db: firebase.database.Reference = firebase.database().ref('/');
  messaging: firebase.messaging.Messaging = null;

  // listeningRooms: Array<ApiChatRoom> = [];
  // currentRoomNo = 0;

  // newMessageOnCurrentRoom = new Subject<ApiChatMessage>();


  // private firebaseEvent: firebase.database.EventType = 'value';

  private countToastMessage = 0;


  /**
   * Becareful!
   *
   * this.a.platform is a string. not ionic angular api object.
   *
   */
  platform: 'web' | 'cordova' = 'web';
  // isMobileWeb = AngularLibrary.isMobileWeb();

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
  // myRoomsPageVisited = false;
  counter = 0;
  //
  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly ngZone: NgZone,
    private readonly router: Router,
    private readonly toastController: ToastController,
    private readonly alertController: AlertController,
    private readonly navController: NavController,
    private readonly philgo: PhilGoApiService,
    public readonly tr: LanguageTranslate,
    private p: Platform
  ) {
    window['triggerToastMessageClick'] = this.onClickToastMessage.bind(this);
    // console.log('isPushNotificationRequested: ', this.isPushNotificationPermissionRequested());

    this.tr.languageCode = AngularLibrary.getUserLanguage();
    console.log('lang: ', this.tr.languageCode);
    this.p.backButton.subscribe(async () => {
      this.router.navigateByUrl('/');
      if (this.counter === 0) {
        this.counter++;
        setTimeout(() => this.counter = 0, 500);
      } else {
        const alert = await this.alertController.create({
          header: this.tr.t({ ko: '채팅앱 종료', en: 'Exit App!', ch: '退出App！', jp: '終了アプリ！' }),
          message: this.tr.t({ ko: '채팅앱을 종료하시겠습니까?', en: 'Do you want to exist App?', ch: '你想存在App吗？', jp: 'あなたはAppを存在させたいですか？' }),
          buttons: [
            {
              text: this.tr.t({ ko: '아니오', en: 'No', ch: '没有', jp: 'いいえ' }),
              role: 'cancel',
              cssClass: 'secondary',
              handler: (blah) => {
              }
            }, {
              text: this.tr.t({ ko: '예', en: 'Yes', ch: '是', jp: 'はい' }),
              handler: () => {
                navigator['app'].exitApp();
              }
            }
          ]
        });
        await alert.present();
      }
    });

    // this.philgo.chatInfo().subscribe(info => {
    //   // console.log('info: ', info);
    //   this.info = info;
    // });
    this.p.ready().then(() => {

      // alert('is mobile web?: ' + AngularLibrary.isMobileWeb());

      if (this.p.is('cordova')) {
        this.platform = 'cordova';
        FCMPlugin.getToken(token => {
          this.pushToken = token;
          this.philgo.updatePusTokenToServer(token);
        });
        FCMPlugin.onTokenRefresh(token => {
          this.pushToken = token;
          this.philgo.updatePusTokenToServer(token);
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
      } else {
        /**
         * Web 설정.
         *
         * Cordova 에서 firebase.messaging() 을 하면 에러 발생.
         */
        this.messaging = firebase.messaging();

        /**
         * 채팅에서 백그라운드로 메시지가 와도 별로 할 것이 없다. 왜냐하면, firebase realtiem update 로 message toast 를 상단에 보여주기 때문이다.
         */
        this.messaging.onMessage((payload) => {
          // console.log('Got FCM notification! Just ignore since app has toast.');
        });


        // 아래 코드는 굳이 여기서 오출 할 필요가 없다. philgo api constructor() 에서 자동으로 호출된다.
        // this.philgo.updateWebPushToken();
      }
      this.onInit();
    });



    philgo.newMessageFromOtherRoom.subscribe(message => {
      console.log('philgo.comnewMessageFromOtherRoom', message);
      this.toastMessage(message);
      this.philgo.chatIncreaseNoOfNewMessage(message.idx_chat_room);
    });
  }

  /**
   * Platform 초기화 되고 맨 처음 한번만 호출 된다.
   */
  onInit() {
    if (this.platform === 'web') {
      this.doCookieLogin();
    } else if (this.platform === 'cordova') {


    }
  }

  /**
   * 로그인이 되어 있지 않은 상태이면, 필고 쿠키를 바탕으로 회원 로그인을 한다.
   */
  doCookieLogin() {
    if (this.philgo.isLoggedIn()) {
      return;
    }
    const idx = AngularLibrary.getCookie('idx');
    const nickname = AngularLibrary.getCookie('nickname');
    const session_id = AngularLibrary.getCookie('session_id');
    const webbrowser_id = AngularLibrary.getCookie('webbrowser_id');
    // console.log(idx, nickname, session_id, webbrowser_id);
    const user: ApiUserInformation = <any>{
      idx: idx,
      id: idx,
      nickname: nickname,
      session_id: session_id
    };
    this.philgo.saveUserInformation(user);
  }
  /**
   * 로그인을 하면 항상 이곳이 호출된다.
   */
  onLogin() {
    this.philgo.chatLoadMyRooms().subscribe(() => { });
    this.philgo.updateWebPushToken();
  }
  /**
   * 회원 가입을 하면 항상 이 함수가 호출된다.
   */
  onRegister() {
    this.philgo.chatLoadMyRooms().subscribe(() => { });
    this.philgo.updateWebPushToken();
  }
  /**
   * 회원 정보 수정을 하면 항상 이 함수가 호출된다.
   */
  onProfileUpdate() {
    this.philgo.updateWebPushToken();
  }
  /**
   * 회원 로그아웃을 하면 항상 이 함수가 호출된다.
   */

  onLogout() {
    this.philgo.updateWebPushToken();
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
      // console.log('o is tring');
      o = {
        message: o
      };
    }
    if (o.closeButtonText === void 0) {
      o.closeButtonText = this.tr.t({ ko: '닫기', en: 'Close', jp: '閉じる', ch: '关' });
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
        this.openAllRooms();
        this.philgo.chatResetMyRooms();
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
    // console.log('toastMessage: ', o);
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
    // console.log('onClickToastMessage() idx_chat_room: ', idx_chat_room, toastClass);
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

  openHome() {
    this.router.navigateByUrl(this.home());
  }
  openMyRooms() {
    this.setRoot('/my-rooms');
  }
  openAllRooms() {
    this.router.navigateByUrl(this.allRooms());
  }



  home(): string {
    return '/';
  }
  allRooms(): string {
    return '/all-rooms';
  }

  setRoot( path: string ) {
    console.log('AppService::setRoot() ', path);
    this.navController.navigateRoot( path );
  }

  /**
   * 현재 방에 입장해 있는 경우만 방 번호 없이 호출 가능.
   */
  openRoomSettings() {
    this.router.navigateByUrl('/room/' + this.philgo.currentRoom.idx + '/setting');
  }

  /**
   * 방 번호를 입력받아 해당 방으로 이동
   */
  openRoom(idx_chat_room) {
    this.router.navigateByUrl('/room/' + idx_chat_room);
  }

  
  async alert(options: AlertOptions) {
    if (!options) {
      return;
    }

    if (!options.buttons) {
      options.buttons = [this.philgo.t({ en: 'OK', ko: '확인' })];
    }

    const alert = await this.alertController.create(options);
    await alert.present();
  }

  t(o, i) {
    return this.tr.t(o, i);
  }
}
