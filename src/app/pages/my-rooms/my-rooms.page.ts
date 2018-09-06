import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.service';
import { LanguageTranslate } from '../../modules/language-translate/language-translate';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.page.html',
})
export class MyRoomsPage implements OnInit, AfterViewInit {

  title = 'Loading...';

  sortByMessage = false;
  // componentCreated = false;
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService,
    public tr: LanguageTranslate,
    private router: Router
  ) {

    // philgo.chatSearch().subscribe(res => {
    //   console.log('search res => ', res);
    // }, e => a.toast(e));

    console.log('MyRoomsPage::constructor()');
    // a.myRoomsPageVisited = true;

    if (this.philgo.isLoggedOut()) {
      this.a.openAllRooms();
    } else {
    }
  }

  /**
   * This method is being invoked only 1 time of each appearance to view.
   * @description
   *    (1) When component is created, it is being called from Angular Life Cycle of ngAfterViewInit()
   *    (2) When component is viewed by Ionic Nav Pop of above page in nav stack,
   *        this method is being called from Ionic Life Cycle of 'ionViewDidEnter()'
   */
  // onOnceEveryEnter() {
  //   console.log('MyRoomsPage::onOnceEveryEnter()');
  //   console.log('componentCreated: ', this.componentCreated);

  // }

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
