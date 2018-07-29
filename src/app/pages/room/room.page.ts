import { Component, OnInit, ViewChild, NgZone, ElementRef } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService } from '../../modules/philgo-api-v3/philgo-api.module';
import { ApiChatMessage, ApiChatRoomInfo, } from '../../modules/philgo-api-v3/philgo-api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  @ViewChild('ionScroll') ionScroll;

  roomInfo: ApiChatRoomInfo = <any>{};
  form: ApiChatMessage = <any>{};
  messages: Array<ApiChatMessage> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone,
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    this.loadRoomInfo();
  }

  ngOnInit() {

  }

  ionViewDidEnter() {
    console.log('ion did enter');
    this.loadRoomInfo();
  }

  loadRoomInfo() {
    setTimeout(() => {
      this.activatedRoute.paramMap.subscribe(params => {
        const idx = params.get('idx_chat_room');
        if (idx) {
          this.form.idx_chat_room = parseInt(idx, 10);
          this.philgo.chatRoomInfo({ idx: this.form.idx_chat_room }).subscribe(res => {
            console.log('info: ', res);
            this.roomInfo = res;
            this.messages = this.roomInfo.messages.reverse();
            this.scroll();
          }, e => this.a.toast(e));
        } else {
          this.a.toast('Chat room number was not provided.');
        }
      });
    }, 100);
  }
  scroll() {
    setTimeout(() => {
      this.ionScroll.nativeElement.scrollToBottom(30);
    }, 100);
  }

  onClickSendMessage() {
    console.log('form: ', this.form);
    this.philgo.chatMessageSend(this.form).subscribe(res => {
      console.log('message sent: ', res);
      this.form.message = '';
      this.messages.push( res );
      this.scroll();
    }, e => this.a.toast(e));
  }
}
