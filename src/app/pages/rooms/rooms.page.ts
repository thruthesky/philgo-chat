import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomsComponent } from '../../components/rooms/rooms.component';
import { Router } from '@angular/router';
import { ApiChatRoom } from '../../modules/philgo-api-v3/philgo-api.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {

  @ViewChild('appRoomsComponent') appRoomsComponent: RoomsComponent;
  show = {
    createRoom: false
  };
  constructor(
    private router: Router
  ) {
    console.log('RoomsPage::constructor()');
  }

  ngOnInit() {
  }


  onCancelCreateRoom() {
    console.log('show.createRoom = false');
    this.show.createRoom = false;
  }

  onClickMyRooms() {
    this.appRoomsComponent.loadMyChatRoomList();
  }
  onClickAllRooms() {
    this.appRoomsComponent.loadChatRoomList();
  }

  // onEnterRoom(room: ApiChatRoom) {
  //   this.appRoomsComponent.loadMyChatRoomList(() => {
  //     console.log(`Entering a room from all page list.`);
  //     // this.router.navigateByUrl(`/room/${room.idx}`);
  //   });
  // }
}
