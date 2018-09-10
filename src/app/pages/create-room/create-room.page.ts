import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.page.html',
  styleUrls: ['./../../modules/components/scss/index.scss', './create-room.page.scss']
})
export class CreateRoomPage implements OnInit {

  constructor(
    private router: Router,
    public a: AppService
  ) { }

  ngOnInit() {
  }

}

