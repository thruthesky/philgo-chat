import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.page.html',
  styleUrls: ['./create-room.page.scss'],
})
export class CreateRoomPage implements OnInit {

  constructor(
    private router: Router,
    public a: AppService
  ) { }

  ngOnInit() {
  }


  onCancelCreateRoom() {
    // console.log('show.createRoom = false');
    this.router.navigateByUrl('/my-rooms');
  }

}

