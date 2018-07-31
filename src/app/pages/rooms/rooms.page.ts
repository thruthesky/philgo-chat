import { Component, OnInit, ViewChild } from '@angular/core';
import { RoomsComponent } from '../../components/rooms/rooms.component';

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
  constructor() {
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
}
