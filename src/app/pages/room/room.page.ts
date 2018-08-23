import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { AppService } from '../../providers/app.service';
import {
  ApiChatMessage, ERROR_CHAT_NOT_IN_THAT_ROOM, ERROR_CHAT_ANONYMOUS_CANNOT_ENTER_ROOM, PhilGoApiService
} from '../../modules/philgo-api/philgo-api.service';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { LanguageTranslate } from '../../modules/language-translate/language-translate';


@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss']
})
export class RoomPage implements OnInit {
  countMessageSent = 0;
  form: ApiChatMessage = <any>{};
  constructor(
    private router: Router,
    public actionSheetController: ActionSheetController,
    private alertController: AlertController,
    public a: AppService,
    public philgo: PhilGoApiService,
    public tr: LanguageTranslate
  ) {

  }

  ngOnInit() {
  }

  ionViewDidEnter() {
  }
  ionViewWillLeave() {
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
              this.a.toast( this.tr.t({ko: '즐겨찾기에 삭제되었습니다.', en: 'This room has removed as favorite'}) );
              this.philgo.currentRoom.favorite = '';
            }, e => this.a.toast(e));
          } else {
            this.philgo.chatFavorite(this.philgo.currentRoom.idx).subscribe(res => {
              // console.log('favorite:', res);
              this.a.toast( this.tr.t({ko: '즐겨찾기에 추가되었습니다.', en: 'This room has added as favorite'}) );
              this.philgo.currentRoom.favorite = 'Y';
            }, e => this.a.toast(e));
          }
        }
      }, {
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
    } else {
      location.href = '/';
    }
    return false;
  }

  async onChatMessageDisplayError(e) {

    if (e.code === ERROR_CHAT_ANONYMOUS_CANNOT_ENTER_ROOM) {
      await (await this.alertController.create({
        message: e.message,
        buttons: [this.a.tr.t({ ko: '닫기', en: 'Close' })]
      })).present();
    } else {
      this.a.toast(e);
    }
    this.router.navigateByUrl('/');
  }
}

