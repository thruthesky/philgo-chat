import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.service';
import { LanguageTranslate } from '../../modules/language-translate/language-translate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.page.html',
})
export class MyRoomsPage implements OnInit {

  title = 'Loading...';

  sortByMessage = false;
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService,
    public tr: LanguageTranslate,
    private router: Router
  ) {

    // philgo.chatSearch().subscribe(res => {
    //   console.log('search res => ', res);
    // }, e => a.toast(e));

    a.myRoomsPageVisited = true;
  }


  ngOnInit() {
  }

  ionViewDidEnter() {

    const name = this.philgo.name();
    this.title = this.tr.t({
      ko: `${name}님의 대화방 목록`,
      en: `Chat room list of ${name}`,
      ch: `${name}的聊天室列表`,
      jp: `${name}のチャットルームリスト`
    });

    if (this.philgo.isLoggedOut()) {
      this.a.openAllRooms();
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
}
