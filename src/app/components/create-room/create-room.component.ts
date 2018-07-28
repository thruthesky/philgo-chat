import { Component, OnInit } from '@angular/core';
import { ApiChatRoomCreateRequest, PhilGoApiService } from '../../modules/philgo-api-v3/philgo-api.service';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  form: ApiChatRoomCreateRequest = <any>{};
  constructor(
    public philgo: PhilGoApiService,
    public a: AppService
  ) {
    //
    this.test();
  }

  test() {
    this.form.name = 'abc';
    this.form.description = 'this is abc room';
    this.onSubmit();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.philgo.chatCreateRoom(this.form).subscribe(res => {
      console.log('create: ', res);
    }, e => this.a.toast(e.message));
  }
}
