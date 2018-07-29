import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService } from '../../modules/philgo-api-v3/philgo-api.module';
import { ApiChatRoom } from '../../modules/philgo-api-v3/philgo-api.service';

@Component({
  selector: 'app-rooms-component',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {

  rooms: Array<ApiChatRoom> = [];
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    philgo.chatRoomList().subscribe(res => {
      console.log('list: ', res);
      this.rooms = res;
    }, e => a.toast(e));
  }

  ngOnInit() {
  }

}
