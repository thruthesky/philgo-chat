import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService } from '../../modules/philgo-api-v3/philgo-api.module';
import { ApiChatRoom } from '../../modules/philgo-api-v3/philgo-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rooms-component',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, OnDestroy {

  // @Output() enter = new EventEmitter<ApiChatRoom>();
  rooms: Array<ApiChatRoom> = [];
  constructor(
    private router: Router,
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
  }

  ngOnInit() {
    console.log('RoomsComponent::ngOnInit()');
    // this.loadMyChatRoomList();
  }
  ngOnDestroy() {
    console.log('RoomsComponent::ngOnDestroy()');
  }


  loadMyChatRoomList(callback?) {
    this.philgo.chatMyRoomList().subscribe(res => {
      // console.log('my room list: ', res);
      this.rooms = res;
      this.a.listenMyRooms(this.rooms).then(() => {
        if (callback) {
          callback();
        }
      });
    }, e => this.a.toast(e));
  }
  loadChatRoomList() {
    this.philgo.chatRoomList().subscribe(res => {
      console.log('list: ', res);
      this.rooms = res;
    }, e => this.a.toast(e));
  }
  // onClickRoom(room: ApiChatRoom) {
  //   this.a.addRoomToListen(room);
  //   this.router.navigateByUrl(`/room/${room.idx}`);
  // }
}
