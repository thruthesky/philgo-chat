import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RoomsComponent } from '../../components/rooms/rooms.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiChatRoom, PhilGoApiService } from '../../modules/philgo-api-v3/philgo-api.service';
import { AppService } from '../../providers/app.service';

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
  show = {
    searchBox: false
  };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public philgo: PhilGoApiService,
    public a: AppService
  ) {
    console.log('RoomsPage::constructor()');
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
        this.a.toast('Please login in');
        this.initAllRooms();
      } else {
        if (data.mode === 'all') {
          this.initAllRooms();
        } else {
          this.initMyRooms();
        }
      }
    });
  }
  ionViewWillLeave() {
    console.log('   ===> RoomsPage::ionViewWillLeave()');
  }


  initMyRooms() {
    this.title = 'My Rooms';
    this.show.searchBox = false;
    this.appRoomsComponent.loadMyChatRoomList();
  }
  initAllRooms() {
    this.title = 'All Rooms';
    this.show.searchBox = true;
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
