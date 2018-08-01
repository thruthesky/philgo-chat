import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { RoomsComponent } from '../../components/rooms/rooms.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiChatRoom } from '../../modules/philgo-api-v3/philgo-api.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit, OnDestroy {

  @ViewChild('appRoomsComponent') appRoomsComponent: RoomsComponent;
  show = {
    searchBox: false
  };
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
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
      if (data.mode === 'all') {
        this.initAllRooms();
      } else {
        this.initMyRooms();
      }
    });
  }
  ionViewWillLeave() {
    console.log('   ===> RoomsPage::ionViewWillLeave()');
  }


  initMyRooms() {
    this.show.searchBox = false;
    this.appRoomsComponent.loadMyChatRoomList();
  }
  initAllRooms() {
    this.show.searchBox = true;
    this.appRoomsComponent.loadChatRoomList();
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
