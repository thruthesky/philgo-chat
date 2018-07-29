import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {

  show = {
    createRoom: false
  };
  constructor() { }

  ngOnInit() {
  }


  onCancelCreateRoom() {
    console.log('show.createRoom = false');
    this.show.createRoom = false;
  }

  onClickMyRooms() {

  }
  onClickAllRooms() {

  }
}
