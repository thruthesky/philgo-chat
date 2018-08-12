import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ApiChatRoomCreateRequest, PhilGoApiService } from '../../modules/philgo-api-v3/philgo-api.service';
import { AppService } from '../../providers/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room-component',
  templateUrl: './create-room.component.html'
})
export class CreateRoomComponent implements OnInit {

  form: ApiChatRoomCreateRequest = <any>{};
  @Output() cancel = new EventEmitter<any>();
  constructor(
    private router: Router,
    public philgo: PhilGoApiService,
    public a: AppService
  ) {
    //
    // this.test();
  }

  // test() {
  //   this.form.name = 'abc';
  //   this.form.description = 'this is abc room';
  //   this.onSubmit();
  // }

  ngOnInit() {
  }

  onSubmit() {
    this.philgo.chatRoomCreate(this.form).subscribe(res => {
      console.log('create: ', res);
      this.router.navigateByUrl('/room/' + res.idx);
    }, e => {
      this.a.toast(e);
    });
  }
  onCancel() {
    // console.log('onCancel: ');
    this.cancel.emit();
  }
}

