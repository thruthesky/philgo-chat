import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService, ApiError } from '../../modules/philgo-api/philgo-api.service';
import { LanguageTranslate } from '../../modules/language-translate/language-translate';


@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.page.html',
})
export class MyRoomsPage implements OnInit, AfterViewInit {

  title = 'Loading...';

  sortByMessage = false;
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService,
    public tr: LanguageTranslate
  ) {
    console.log('MyRoomsPage::constructor()');

  }

  ngOnInit() {
    console.log('MyRoomsPage::onInit()');
  }

  ngAfterViewInit() {
    console.log('MyRoomsPage::ngAfterViewInit()');
  }
  ionViewDidEnter() {
    console.log('MyRoomsPage::ionViewDidEnter()');

    if (this.philgo.isLoggedIn()) {
      this.philgo.chatLoadMyRooms().subscribe(res => {
      }, e => {
        console.error('failed to load my rooms information');
      });
      const name = this.philgo.name();
      this.title = this.tr.t({
        ko: `${name}님의 대화방 목록`,
        en: `Chat room list of ${name}`,
        ch: `${name}的聊天室列表`,
        jp: `${name}のチャットルームリスト`
      });
    } else {

    }
  }

  sortRoomsByNewMessage() {
    if (this.sortByMessage) {
      this.sortByMessage = false;
      this.philgo.sortMyRooms();
    } else {
      this.sortByMessage = true;
      this.philgo.sortMyRoomsByMessage();
    }
  }

  onChatMyRoomsComponentError(error: ApiError) {
    this.a.toast(error);
  }
}
