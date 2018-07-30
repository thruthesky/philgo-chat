import { Injectable, NgZone } from '@angular/core';
import { ToastController } from '../../../node_modules/@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/messaging';
import { ApiChatRoom, ApiChatMessage, PhilGoApiService } from '../modules/philgo-api-v3/philgo-api.service';
import { Subject } from 'rxjs';



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
  constructor(
    private readonly ngZone: NgZone,
    private readonly toastController: ToastController,
    private readonly philgo: PhilGoApiService
  ) { }

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
    console.log('o: ', o);
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
    console.log('o: ', o);
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
  async toastMessage(o: any) {
    console.log('o: ', o);
    if (!o) {
      return;
    }
    if (o.closeButtonText === void 0) {
      o.closeButtonText = 'Close';
    }
    if (o.duration === void 0) {
      o.duration = 10000;
    }
    o.cssClass = 'new-chat-message';
    o.position = 'top';
    o.showCloseButton = false;
    console.log('o: ', o);
    const toast = await this.toastController.create(o);
    toast.present();
  }

  render(ms = 10) {
    setTimeout(() => {
      this.ngZone.run(() => { });
    }, ms);
  }

  listenMyRooms(rooms: Array<ApiChatRoom>) {
    const event = 'value';
    if (!rooms) {
      return;
    }
    /**
     * Off(remove) all the event of old listening rooms.
     */
    for (const room of this.listeningRooms) {
      console.log('Off: ', room.name);
      this.db.child(`/chat/rooms/${room.idx}/last-message`).off(event, room['off']);
    }
    /**
     * listen to my rooms
     */
    for (const room of rooms) {
      console.log('On: ', room.name);
      this.db.child(`/chat/rooms/${room.idx}/last-message`).on(event, snapshot => {
        const message: ApiChatMessage = snapshot.val();
        // console.log('AppService::listennMyRooms() got message: ', message);

        if (this.philgo.isMyChatMessage(message)) {
          return;
        }
        if (this.philgo.isMyCurrentChatRoomMessage(this.currentRoomNo, message)) {
          console.log('AppService::listenMyRooms():: got current room message. next()', message);
          this.newMessageOnCurrentRoom.next(message);
          return;
        }
        this.toastMessage(snapshot.val());
      });
    }
  }


}
