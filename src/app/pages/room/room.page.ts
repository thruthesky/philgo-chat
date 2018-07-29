import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService } from '../../modules/philgo-api-v3/philgo-api.module';
import { ApiChatMessage } from '../../modules/philgo-api-v3/philgo-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {

  form: ApiChatMessage = <any>{};
  constructor(
    private activatedRoute: ActivatedRoute,
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    activatedRoute.paramMap.subscribe(params => {
      const idx = params.get('idx_chat_room');
      if (idx) {
        this.form.idx_chat_room = parseInt(idx, 10);
      } else {
        this.a.toast('Chat room number was not provided.');
      }
    });
  }

  ngOnInit() {

  }

  onClickSendMessage() {
    console.log('form: ', this.form);
    this.philgo.chatMessageSend(this.form).subscribe(res => {
      console.log('message sent: ', res);
    }, e => this.a.toast(e));
  }
}
