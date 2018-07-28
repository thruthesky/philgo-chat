import { Component, OnInit } from '@angular/core';
import { PhilGoApiService } from '../../modules/philgo-api-v3/philgo-api.module';
import { ApiProfileUpdateRequest } from '../../modules/philgo-api-v3/philgo-api.service';
import { ToastController } from '../../../../node_modules/@ionic/angular';
import { AppService } from '../../providers/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isLoggedIn = false;
  form;
  loader = {
    profile: false,
    submit: false
  };

  constructor(
    public readonly toastController: ToastController,
    public readonly philgo: PhilGoApiService,
    public readonly a: AppService
  ) {
    this.resetForm();
    console.log('RegisterPage::constructor()');
  }


  ionViewDidEnter() {
    console.log('RegisterPage::ionViewDidEnter()');

    this.isLoggedIn = this.philgo.isLoggedIn();
    if (this.philgo.isLoggedIn()) {
      this.loader.profile = true;
      this.philgo.profile().subscribe(user => {
        this.loader.profile = false;
        this.form = user;
        console.log('user: ', user);
      }, e => alert(e.message));
    } else {
      this.resetForm();
    }
  }

  resetForm() {
    this.form = {
      email: '',
      password: '',
      name: '',
      nickname: '',
      mobile: ''
    };
  }

  // test() {
  //   this.form.email = 'email' + (new Date).getTime() + '@gmail.com';
  //   this.form.password = this.form.email;
  //   this.form.name = 'test';
  //   this.form.nickname = this.form.email;
  //   this.form.mobile = '01234567890';
  //   this.onSubmit();
  // }

  ngOnInit() {
  }

  onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
    }

    console.log('philgo.isLoggedIn?', this.philgo.isLoggedIn());
    console.log('whoami?: ', this.philgo.nickname());
    console.log('di?', this.form);
    if (this.philgo.isLoggedIn()) {
      console.log('going to update profile');
      const data: ApiProfileUpdateRequest = {
        name: this.form.name,
        mobile: this.form.mobile
      };
      this.philgo.profileUpdate(data).subscribe(user => {
        this.loader.submit = false;
        console.log('profile update success: ', user);
        this.a.toast('Your profile has been successfully updated.');
      }, e => {
        this.loader.submit = false;
        this.a.toast(e.message);
      });
    } else {
      this.philgo.register(this.form).subscribe(user => {
        this.loader.submit = false;
        this.isLoggedIn = true;
      }, e => {
        this.loader.submit = false;
        this.a.toast(e.message);
      });
    }

    return false;
  }

}
