import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AppService } from '../../providers/app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PhilGoApiService, ApiProfile } from '../../modules/philgo-api/philgo-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./../../modules/components/scss/index.scss', './register.page.scss']
})
export class RegisterPage implements OnInit {

  // isLoggedIn = false;
  // form;
  // loader = {
  //   profile: false,
  //   submit: false
  // };

  // percentage = 0;
  constructor(
    public readonly toastController: ToastController,
    public readonly philgo: PhilGoApiService,
    public readonly a: AppService
  ) {
  }


  ngOnInit() {
  }


  onRegister(user: ApiProfile) {
    this.a.toast(
      this.a.tr.t({
        ko: '#name님, 회원 가입을 하였습니다. 축하합니다.',
        en: 'Welcome #name, You have successfully registered.'
      },
        { name: user.nickname }
      ));
    this.a.onRegister();
  }
  onUpdate(user: ApiProfile) {
    this.a.onProfileUpdate();
    this.a.toast(this.a.tr.t({ ko: '회원 정보를 수정하였습니다.', en: 'Your profile has been successfully updated.' }));
  }

}
