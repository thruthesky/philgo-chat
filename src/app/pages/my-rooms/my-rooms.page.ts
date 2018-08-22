import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'app-my-rooms',
  templateUrl: './my-rooms.page.html',
  styleUrls: ['./my-rooms.page.scss'],
})
export class MyRoomsPage implements OnInit {

  constructor(
    public a: AppService
  ) { }

  ngOnInit() {
  }

}
