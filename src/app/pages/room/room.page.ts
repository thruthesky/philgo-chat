import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import {
  ApiChatMessage, ERROR_CHAT_NOT_IN_THAT_ROOM, ERROR_CHAT_ANONYMOUS_CANNOT_ENTER_ROOM, PhilGoApiService
} from '../../modules/philgo-api/philgo-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, Content, PopoverController, InfiniteScroll } from '@ionic/angular';
import { LanguageTranslate } from '../../modules/language-translate/language-translate';
import { ChatRoomMessagesComponent } from '../../modules/components/chat/chat-room-messages/chat-room-messages.component';
import { ReminderPopoverComponent } from './reminder-popover/reminder-popover.component';
import { AngularLibrary } from '../../modules/angular-library/angular-library';

const REMINDER_KEY = 'room-reminder';
const NO_REMINDER_FROM_KEY = 'no-room-reminder-from';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html'
})
export class RoomPage implements OnInit, AfterViewInit {
  @ViewChild(Content) ionContent: Content;
  @ViewChild('messagesComponent') messagesComponent: ChatRoomMessagesComponent;
  countMessageSent = 0;
  form: ApiChatMessage = <any>{};

  popover = null; // save last popover
  // reminderPopover: HTMLIonPopoverElement = null;

  enableLoadOldMessage = false;

  page = 1;
  noMoreChatMessages = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public actionSheetController: ActionSheetController,
    private alertController: AlertController,
    public a: AppService,
    public philgo: PhilGoApiService,
    public tr: LanguageTranslate,
    public popoverController: PopoverController
  ) {
    philgo.chatResetRoom();
    a.chatRoomReminderClose.subscribe(async () => {
      await this.popover.dismiss();
      AngularLibrary.set(REMINDER_KEY, this.philgo.currentRoom.stamp_update);
      const d = new Date();
      AngularLibrary.set(NO_REMINDER_FROM_KEY, d.getTime());
    });
  }

  async presentPopover(event: any) {
    this.popover = await this.popoverController.create({
      component: ReminderPopoverComponent,
      event: event,
      translucent: true
    });
    await this.popover.present();
    console.log('presentPopover() presented.');
  }

  ngOnInit() {
  }


  ngAfterViewInit() {
    // it has changed after checked.
    setTimeout(() => this.enterRoom(), 100);
  }
  ionViewDidEnter() {
  }
  ionViewWillLeave() {
  }

  enterRoom() {
    const mc = this.messagesComponent;
    this.activatedRoute.paramMap.subscribe(params => {
      const idx = params.get('idx_chat_room');
      if (idx) {
        this.philgo.chatResetNoOfNewMessageOfRoom(idx);
        /**
         * idx_chat_room in route may be string.
         */
        //   this.form.idx_chat_room = idx;
        // this.philgo.currentRoom.idx = idx;
        // this.a.currentRoomNo = parseInt(this.form.idx_chat_room, 10);
        this.philgo.chatEnterRoom({ idx: idx }, { cacheCallback: res => mc.arrangeRoomEnter(res) }).subscribe(res => {
          mc.show.status.loadingLatestMessages = false;
          /**
           * 새로 방에 입장했으면, 전체 방 목록을 다시 로드한다.
           */
          if (res.just_entered === 'Y') {
            this.philgo.chatLoadMyRooms().subscribe(_res => {
              console.log('ChatAllRoomsComponent::onClickRoom()', _res);
            });
          }
          mc.arrangeRoomEnter(res);
          this.showReminder();
          this.enableLoadOldMessage = true;
        }, e => {
          console.log(e.code);
          this.a.toast(e);
          if (e.code === ERROR_CHAT_ANONYMOUS_CANNOT_ENTER_ROOM) {
            this.a.openAllRooms();
          }
        });
      } else {
        // this error will not happens.
        // this.a.toast('Chat room number was not provided.');
        console.error('Chat room number was not provided in route.');
      }
    });
  }

  showReminder() {
    if (this.philgo.currentRoom || !this.philgo.currentRoom.reminder || !this.philgo.currentRoom.reminder.trim()) {
      return false;
    }
    let re = false;
    const update = AngularLibrary.get(REMINDER_KEY);
    console.log('reminder key: ', update);
    console.log('stamp update: ', this.philgo.currentRoom.stamp_update);
    if (update !== this.philgo.currentRoom.stamp_update) {
      console.log('Reminder has been changed. show now');
      re = true;
    }
    let t = AngularLibrary.get(NO_REMINDER_FROM_KEY);
    t += 60 * 60 * 24 * 7 * 1000; // 7 days.
    const n = (new Date).getTime(); // now
    console.log('no reminder from: ', t);
    console.log('..time right now: ', n);

    // d.setDate(d.getDate() + 7);
    // console.log(d.toLocaleDateString());

    if (t < n) {
      console.log('No reminder period has been passed. show now');
      re = true;
    }

    if (re) {
      setTimeout(() => this.presentPopover(null), 100);
    }
  }

  async presentRoomOptions() {

    let favoriteText = this.a.tr.t({ ko: '즐겨찾기 추가', en: 'Favorite' });
    if (this.philgo.currentRoom.favorite === 'Y') {
      favoriteText = this.a.tr.t({ ko: '즐겨찾기에서 삭제', en: 'Remove from Favorite' });
    }
    const actionSheet = await this.actionSheetController.create({
      header: this.a.tr.t({ ko: '채팅방 옵션', en: 'Options' }),
      buttons: [{
        text: this.a.tr.t({ ko: '채팅 방 나가기', en: 'Leave Chat Room' }),
        role: 'destructive',
        icon: 'trash',
        handler: async () => {
          // console.log('Room leave clicked');

          const alert = await this.alertController.create({
            header: this.a.tr.t({ ko: '방 나가기', en: 'Leave' }),
            message: this.a.tr.t({ ko: '채팅방을 나가시겠습니까?', en: 'Do you want to leave this room?' }),
            buttons: [
              {
                text: this.a.tr.t({ ko: '아니오', en: 'No' }),
                role: 'no',
                cssClass: 'secondary',
                handler: (blah) => {
                  // console.log('Confirm Cancel: blah');
                }
              }, {
                text: this.a.tr.t({ ko: '예', en: 'Yes' }),
                role: 'yes',
                handler: () => {
                  // console.log('Confirm Okay');
                  this.reloadMyRoom();
                }
              }
            ]
          });
          alert.present();
          const re = await alert.onDidDismiss();
          // console.log('result of present: ', re.role);

          if (re.role === 'no') {
            return;
          }

          this.philgo.chatLeaveRoom(this.philgo.currentRoom.idx).subscribe(res => {
            // console.log('You have successfully left the room: ', res.name);
            this.router.navigateByUrl('/my-rooms');
          }, e => {
            if (e.code !== void 0 && e.code === ERROR_CHAT_NOT_IN_THAT_ROOM) {
              this.router.navigateByUrl('/my-rooms');
            } else {
              this.a.toast(e);
            }
          });
        }
      },
      {
        text: favoriteText,
        icon: 'heart',
        handler: () => {
          // console.log('favorite clicked');
          // console.log('chatphilgo.currentRoom: ', this.philgo.currentRoom);
          if (this.philgo.currentRoom.favorite === 'Y') {
            this.philgo.chatUnfavorite(this.philgo.currentRoom.idx).subscribe(res => {
              // console.log('un-favorite:', res);
              this.a.toast(this.tr.t({ ko: '즐겨찾기에 삭제되었습니다.', en: 'This room has removed as favorite' }));
              this.philgo.currentRoom.favorite = '';
            }, e => this.a.toast(e));
          } else {
            this.philgo.chatFavorite(this.philgo.currentRoom.idx).subscribe(res => {
              // console.log('favorite:', res);
              this.a.toast(this.tr.t({ ko: '즐겨찾기에 추가되었습니다.', en: 'This room has added as favorite' }));
              this.philgo.currentRoom.favorite = 'Y';
            }, e => this.a.toast(e));
          }
        }
      }, {
        text: this.a.tr.t({ ko: '방 인원 목록', en: 'Room user list' }),
        role: 'users',
        icon: 'people',
        handler: () => {
          this.displayUsers();
        }
      }, {
        text: this.a.tr.t({ ko: '방 설정', en: 'Room settings' }),
        role: 'setting',
        icon: 'settings',
        handler: () => {
          this.a.openRoomSettings();
        }
      },
      {
        text: this.a.tr.t({ ko: '닫기', en: 'Cancel' }),
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  onClickLeaveButton() {
    this.philgo.currentRoom = null;
    if (this.a.myRoomsPageVisited) {
      this.router.navigateByUrl('/');
      this.reloadMyRoom();
    } else {
      location.href = '/';
    }
    return false;
  }

  reloadMyRoom() {
    this.philgo.chatLoadMyRooms().subscribe(res => {
      console.log('room page::releoadMyRoom()', res);
    });

  }

  async onChatMessageDisplayError(e) {
    if (e.code === ERROR_CHAT_ANONYMOUS_CANNOT_ENTER_ROOM) {
      await (await this.alertController.create({
        header: this.a.tr.t({ ko: '로그인 필요', en: 'Login Required' }),
        message: e.message,
        buttons: [this.a.tr.t({ ko: '닫기', en: 'Close' })]
      })).present();
    } else {
      this.a.toast(e);
    }
    this.router.navigateByUrl('/');
  }

  displayUsers() {
    this.philgo.chatRoomUsers(this.philgo.currentRoom.idx).subscribe(re => {
      console.log(re);
      this.messagesComponent.displayUsers(re);
    }, e => this.a.toast(e));
  }

  onScroll() {
    this.a.render(20, () => {
      this.ionContent.scrollToBottom();
      this.a.render(10);
    });
  }

  // onChangeAlarm(event: Event) {
  //   console.log(event.target.value);
  // }

  onChangeAlarm(alarm: HTMLIonToggleElement) {
    console.log(alarm.checked);
    const disable = alarm.checked ? '' : 'Y';
    this.philgo.chatDisableAlarm({ idx_chat_room: this.philgo.currentRoom.idx, disable: disable }).subscribe(res => {
      console.log('diable: ', res);
    }, e => this.a.toast(e));
  }

  loadData(event: Event) {
    if (this.noMoreChatMessages) {
      return;
    }
    this.page++;
    const scroll = (<InfiniteScroll><any>event.target);
    const limit = 100;
    this.philgo.chatSearch({ idx_chat_room: this.philgo.currentRoom.idx, page_no: this.page, limit: limit }).subscribe(messages => {
      console.log('search messages => ', messages);
      for (const message of messages) {
        this.messagesComponent.messages.unshift(message);
      }
      if (messages.length < 100) {
        this.noMoreChatMessages = true;
        scroll.disabled = true;
        this.a.toast(this.a.tr.t({ ko: '더 이상 채팅 메시지가 없습니다.', en: 'No more chat messages.' }));
      }
      scroll.complete();
      setTimeout(() => this.ionContent.scrollToPoint(0, 300), 100);
    }, e => {
      scroll.complete();
      this.a.toast(e);
    });

  }
}

