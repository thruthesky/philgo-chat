import { Injectable, NgZone } from '@angular/core';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/messaging';
import {
  ApiChatRoom, ApiChatMessage, PhilGoApiService, CHAT_STATUS_ENTER, CHAT_STATUS_LEAVE
} from '../modules/philgo-api-v3/philgo-api.service';
import { Subject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { Message } from '../../../node_modules/@angular/compiler/src/i18n/i18n_ast';
import { Router } from '@angular/router';



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

  listeningRooms: Array<ApiChatRoom> = [];
  currentRoomNo = 0;

  newMessageOnCurrentRoom = new Subject<ApiChatMessage>();


  private firebaseEvent: firebase.database.EventType = 'value';

  private countToastMessage = 0;
  constructor(
    private readonly domSanitizer: DomSanitizer,
    private readonly ngZone: NgZone,
    private readonly router: Router,
    private readonly toastController: ToastController,
    private readonly philgo: PhilGoApiService
  ) {
    window['triggerToastMessageClick'] = this.onClickToastMessage.bind(this);
    console.log('isPushNotificationRequested: ', this.isPushNotificationRequested());
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
      o.closeButtonText = 'Close';
    }
    if (o.duration === void 0) {
      o.duration = 10000;
    }
    if (typeof o.code !== void 0 && o.code) {
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
   *    - When user first visit my rooms page after app booted. Which means, my rooms page is at the bottom of navigation stack.
   *        In this case, when user visit all rooms page and visit back to my rooms page, this method will be called.
   *    - Whenever user visit my rooms page when my rooms page is not on the bottom of navigation stack.
   *        It needs to delete all my room and add new ones.
   *
   * @todo Re-consider to
   *    - Add listening on only the rooms that are not listened.
   *    - Delete listening of the rooms that are not my rooms.
   *
   *    But it may also be reasonable to refresh all the listeners somehow I feel like the app shold refresh it.
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
   * Listens a room.
   *
   * You can call any room to listen. Even if it's not your room.
   *
   * @param room chat room
   */
  listenRoom(room: ApiChatRoom) {
    // console.log('On: ', room.name);
    room['off'] = this.db.child(`/chat/rooms/${room.idx}/last-message`).on(this.firebaseEvent, snapshot => {
      const message: ApiChatMessage = snapshot.val();

      /**
       * Don't toast if I am opening rooms page for the first time of app running.
       */
      if (room['firstOpenning'] === void 0) {
        // console.log(`First time visiting on Rooms page. Do not toast for the first visit only. room: ${room.name}.`);
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
        console.log('AppService::listenMyRooms():: got current room message. next()', message);
        this.newMessageOnCurrentRoom.next(message);
        return;
      }

      /**
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

  isPushNotificationRequested() {
    // Let's check if the browser supports notifications
    if (!('Notification' in window)) {
      console.log('This browser does not support desktop notification');
      return null;
    }

    if (Notification && Notification['permission'] !== void 0 && Notification['permission'] === 'granted') {
      return false;
    } else {
      return true;
    }
  }
}
