import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService, ApiError, ERROR_LOGIN_FIRST } from '../../modules/philgo-api/philgo-api.service';
import { LanguageTranslate } from '../../modules/language-translate/language-translate';

@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.page.html',
  styleUrls: ['./my-rooms.page.scss']
})
export class MyRoomsPage implements OnInit, AfterViewInit {

  title = 'Loading...';
  frontPage;
  sortByMessage = false;
  showHomeContent = true;
  countChatRoomLoad = 0;
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService,
    public tr: LanguageTranslate
  ) {
    // console.log('MyRoomsPage::constructor()');

    philgo.app('philgo-chat.frontPage', { news: true }).subscribe(res => {
      console.log('app: ', res);
      this.frontPage = res;
    }, e => console.error(e));

  }

  ngOnInit() {
    // console.log('MyRoomsPage::onInit()');
  }

  ngAfterViewInit() {
    // console.log('MyRoomsPage::ngAfterViewInit()');
  }
  ionViewDidEnter() {
    // console.log('MyRoomsPage::ionViewDidEnter()');

    // this.navController.navigateRoot('/');


    this.showHomeContent = true;
    if (this.philgo.isLoggedIn()) {
      this.philgo.chatLoadMyRooms(!this.countChatRoomLoad).subscribe(res => {
        this.countChatRoomLoad++;
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

  onChatMyRoomsComponentError(e: ApiError) {
    // console.log(e);
    if (e.code === ERROR_LOGIN_FIRST) {

    } else {
      this.a.toast(e);
    }
  }
}
