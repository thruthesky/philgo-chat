import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService, ApiError, ERROR_LOGIN_FIRST, ApiPost } from '../../modules/philgo-api/philgo-api.service';
import { LanguageTranslate } from '../../modules/language-translate/language-translate';
import { Router } from '@angular/router';
import { AngularLibrary } from '../../modules/angular-library/angular-library';

@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.page.html',
  styleUrls: ['../../modules/components/scss/index.scss', './my-rooms.page.scss']
})
export class MyRoomsPage implements OnInit, AfterViewInit {

  title = 'Loading...';
  frontPage = {
    mainNews: <ApiPost>{},
    communityPosts: <ApiPost[]>[]
  };
  sortByMessage = false;
  showHomeContent = true;
  countChatRoomLoad = 0;

  _ = AngularLibrary;
  constructor(
    private router: Router,
    public a: AppService,
    public philgo: PhilGoApiService,
    public tr: LanguageTranslate
  ) {
    // console.log('MyRoomsPage::constructor()');

    philgo.app('philgo-chat.frontPage', { news: true }, { cache: true }).subscribe(res => {
      console.log('app: ', res);
      this.frontPage = res;
    }, e => {
      console.log('Got error: ', e);
      console.error(e);
    });

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


  urlView(post: ApiPost) {
    if (post.post_id === 'ads') {
      if (post.link && post.link.trim()) {
        return post.link.trim();
      } else {
        return `/${post.post_id}/${post.idx}`;
      }
    } else {
      return `/forum/${post.post_id}/${post.idx}`;
    }
  }

  urlTarget(post: ApiPost): string {

    if (post.post_id === 'ads') {
      if (post.link && post.link.trim()) {
        return '_blank';
      }
    }
    return '_self';
  }

  onClickPhoto(event: Event, post: ApiPost) {
    event.preventDefault();
    event.stopPropagation();
    if (this.urlTarget(post) === '_blank') {
      window.open(this.urlView(post));
    } else {
      this.router.navigateByUrl(this.urlView(post));
    }
  }

}
