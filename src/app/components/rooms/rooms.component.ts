import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.module';
import { ApiChatRoom } from '../../modules/philgo-api/philgo-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms-component',
  templateUrl: './rooms.component.html'
})
export class RoomsComponent implements OnInit, OnDestroy {

  @Input() share = {};
  roomType: 'my-rooms' | 'all-rooms' = null;
  rooms: Array<ApiChatRoom> = [];
  roomsBackup: Array<ApiChatRoom> = [];

  show = {
    loader: {
      roomList: true
    }
  };
  constructor(
    private router: Router,
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
  }

  ngOnInit() {
    // console.log('RoomsComponent::ngOnInit()');
    // this.loadMyChatRoomList();
  }
  ngOnDestroy() {
    // console.log('RoomsComponent::ngOnDestroy()');
  }

  updateShare() {
    if (this.rooms && this.rooms.length) {
      let no = 0;
      for (const room of this.rooms) {
        if (!isNaN(<any>room.no_of_unread_messages)) {
          no += parseInt(room.no_of_unread_messages, 10);
        }
      }
      this.share['totalNoOfNewMessages'] = no;
    }
  }

  loadMyChatRoomList(callback?) {
    this.show.loader.roomList = true;
    this.roomType = 'my-rooms';
    this.philgo.chatMyRooms().subscribe(res => {

      this.show.loader.roomList = false;
      this.a.info = res.info;
      // console.log('my room list: ', res);
      /**
       * Sort of rooms
       *  - favorite first.
       *  - Alphabet list for others.
       */
      res.rooms.sort((a, b) => {
        if (a.favorite === 'Y' && b.favorite === 'Y') {
          return 0;
        } else if (a.favorite === 'Y') {
          return -1;
        } else if (b.favorite === 'Y') {
          return 1;
        } else {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        }
      });
      this.rooms = res.rooms;
      this.updateShare();
      this.a.listenMyRooms(this.rooms).then(() => {
        if (callback) {
          callback();
        }
      });
    }, e => {
      this.show.loader.roomList = false;
      this.a.toast(e);
    });
  }
  loadAllChatRoomList() {
    this.show.loader.roomList = true;
    this.roomType = 'all-rooms';
    this.philgo.chatOtherRooms().subscribe(res => {
      this.show.loader.roomList = false;
      this.a.info = res.info;
      // console.log('list: ', res);
      this.rooms = res.rooms;
      this.updateShare();
    }, e => {
      this.show.loader.roomList = false;
      this.a.toast(e);
    });
  }
  // onClickRoom(room: ApiChatRoom) {
  //   this.a.addRoomToListen(room);
  //   this.router.navigateByUrl(`/room/${room.idx}`);
  // }

  onSearch(value) {
    // console.log('value: ', value);
    if (value === '' && this.roomsBackup.length) {
      this.onCancelSearch();
      return;
    }
    this.roomsBackup = this.rooms;
    this.rooms = this.rooms.filter(room => {
      if (room.name.indexOf(value) !== -1) {
        return true;
      }
      if (room.description.indexOf(value) !== -1) {
        return true;
      }
    });
  }

  onCancelSearch() {
    if (this.roomsBackup.length) {
      this.rooms = this.roomsBackup;
      this.roomsBackup = [];
    }
  }

  onClickRoom(idx) {
    this.onCancelSearch();
    this.router.navigateByUrl('/room/' + idx);
  }

}
