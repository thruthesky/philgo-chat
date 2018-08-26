import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { ActivatedRoute } from '@angular/router';
import { PhilGoApiService, ApiChatRoomUpdate } from '../../modules/philgo-api/philgo-api.service';

@Component({
  selector: 'app-setting-room',
  templateUrl: './setting-room.page.html',
  styleUrls: ['./setting-room.page.scss'],
})
export class SettingRoomPage implements OnInit {

  form: ApiChatRoomUpdate = {
    idx: '',
    name: '',
    description: '',
    reminder: ''
  };
  constructor(
    activatedRoute: ActivatedRoute,
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    activatedRoute.paramMap.subscribe( params => {
      this.form.idx = params.get('idx_chat_room');
      this.philgo.chatGetRoomSetting(this.form.idx).subscribe( res => {
        console.log('res: ', res);
        this.form = res;
      }, e => this.a.toast(e));
    })
  }

  ngOnInit() {
  }

  onClickBack() {
    this.a.openRoom( this.form.idx );
  }
  onClickSave() {
    this.philgo.chatUpdateRoomSetting(this.form).subscribe(res => {
      console.log('res: ', res);
      if ( this.philgo.currentRoom ) {
        this.philgo.currentRoom.name = this.form.name;
        this.philgo.currentRoom.description = this.form.description;
        this.philgo.currentRoom.reminder = this.form.reminder;
      }
      this.a.openRoom( this.form.idx );
    }, e => this.a.toast(e));
  }
}
