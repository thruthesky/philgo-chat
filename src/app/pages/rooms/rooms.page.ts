import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RoomsComponent } from '../../components/rooms/rooms.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiChatRoom, PhilGoApiService } from '../../modules/philgo-api-v3/philgo-api.service';
import { AppService } from '../../providers/app.service';
import { LanguageTranslate } from '../../modules/language-translate/language-translate';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit, OnDestroy {

  @ViewChild('appRoomsComponent') appRoomsComponent: RoomsComponent;

  title = '';
  share = {
    totalNoOfNewMessages: 0
  };
  // show = {
  //   searchBox: false
  // };
  isMyRoom = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public philgo: PhilGoApiService,
    public a: AppService,
    public lt: LanguageTranslate
  ) {
    console.log('RoomsPage::constructor()');
    this.a.roomsPageVisited = true;
  }

  ngOnInit() {
    console.log('  ==> RoomsPage::ngOnInit()');
  }

  ngOnDestroy() {
    console.log('  ===> RoomsPage::ngOnDestroy()');
  }

  ionViewDidEnter() {
    console.log('  ===> RoomsPage::ionViewDidEnter()');
    this.activatedRoute.paramMap.subscribe(params => {
      console.log('params: ', params);
    });
    this.activatedRoute.data.subscribe(data => {
      console.log('data: ', data);
      /**
       * When user is not logged in, he can only see all rooms.
       */
      if (this.philgo.isLoggedOut()) {
        this.a.toast( this.a.tr.t({ko: '로그인을 해 주세요.', en: 'Please login'}) );
        this.initAllRooms();
      } else {
        if (data.mode === 'all') {
          this.initAllRooms();
        } else {
          this.isMyRoom = true;
          this.initMyRooms();
        }
      }
    });
  }
  ionViewWillLeave() {
    console.log('   ===> RoomsPage::ionViewWillLeave()');
  }


  initMyRooms() {
    this.title = this.lt.t({ ko: '나의 채팅방 목록', en: 'My Chat Rooms' }); // 'My Rooms';
    // this.show.searchBox = false;
    this.appRoomsComponent.loadMyChatRoomList();
  }
  initAllRooms() {
    this.title = this.lt.t({
      ko: '전체 채팅방 목록',
      en: 'All Chat Room List'
    });
    // this.show.searchBox = true;
    this.appRoomsComponent.loadAllChatRoomList();
  }

  onClickMyRooms() {
    this.initMyRooms();
  }
  onClickAllRooms() {
    this.initAllRooms();
  }

  // onEnterRoom(room: ApiChatRoom) {
  //   this.appRoomsComponent.loadMyChatRoomList(() => {
  //     console.log(`Entering a room from all page list.`);
  //     // this.router.navigateByUrl(`/room/${room.idx}`);
  //   });
  // }
}
