import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService } from '../../modules/philgo-api-v3/philgo-api.module';
import { ApiChatRoom } from '../../modules/philgo-api-v3/philgo-api.service';

@Component({
  selector: 'app-rooms-component',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit, OnDestroy {

  rooms: Array<ApiChatRoom> = [];
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
  }

  ngOnInit() {
    console.log('RoomsComponent::ngOnInit()');
    // this.loadChatRoomList();
    this.loadMyChatRoomList();
  }
  ngOnDestroy() {
    console.log('RoomsComponent::ngOnDestroy()');
  }

  ionViewWillEnter() {
    console.log('RoomsComponent::ionViewWillEnter()');
  }

  ionViewDidEnter() {
    console.log('RoomsComponent::ionViewDidEnter()');
  }

  loadMyChatRoomList() {
      this.philgo.chatMyRoomList().subscribe(res => {
        console.log('my room list: ', res);
        this.rooms = res;
        this.a.listenMyRooms( this.rooms );
      }, e => this.a.toast(e));
  }
  loadChatRoomList() {
    this.philgo.chatRoomList().subscribe(res => {
      console.log('list: ', res);
      this.rooms = res;
    }, e => this.a.toast(e));
  }
}
