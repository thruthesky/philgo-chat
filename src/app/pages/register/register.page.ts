import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AppService } from '../../providers/app.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html'
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
    // this.resetForm();
    // console.log('RegisterPage::constructor()');
  }


  // ionViewDidEnter() {
  //   // console.log('RegisterPage::ionViewDidEnter()');

  //   this.isLoggedIn = this.philgo.isLoggedIn();
  //   if (this.philgo.isLoggedIn()) {
  //     this.loader.profile = true;
  //     this.philgo.profile().subscribe(user => {
  //       this.loader.profile = false;
  //       this.form = user;
  //       // console.log('user: ', user);
  //     }, e => this.a.toast(e));
  //   } else {
  //     this.resetForm();
  //   }
  // }

  // resetForm() {
  //   this.form = {
  //     email: '',
  //     password: '',
  //     name: '',
  //     nickname: '',
  //     mobile: ''
  //   };
  // }

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

  // onSubmit(event?: Event) {
  //   if (event) {
  //     event.preventDefault();
  //   }

  //   // console.log('philgo.isLoggedIn?', this.philgo.isLoggedIn());
  //   // console.log('whoami?: ', this.philgo.nickname());
  //   // console.log('di?', this.form);
  //   if (this.philgo.isLoggedIn()) {
  //     // console.log('going to update profile');
  //     const data: ApiProfileUpdateRequest = {
  //       name: this.form.name,
  //       mobile: this.form.mobile
  //     };
  //     this.philgo.profileUpdate(data).subscribe(user => {
  //       this.a.onProfileUpdate();
  //       this.loader.submit = false;
  //       // console.log('profile update success: ', user);
  //       this.a.toast(this.a.tr.t({ ko: '회원 정보를 수정하였습니다.', en: 'Your profile has been successfully updated.' }));
  //     }, e => {
  //       this.loader.submit = false;
  //       this.a.toast(e.message);
  //     });
  //   } else {
  //     this.philgo.register(this.form).subscribe(user => {
  //       this.a.onRegister();
  //       this.loader.submit = false;
  //       this.isLoggedIn = true;
  //     }, e => {
  //       this.loader.submit = false;
  //       this.a.toast(e.message);
  //     });
  //   }

  //   return false;
  // }

  onRegister() {
    this.a.onRegister();
  }
  onUpdate() {
    this.a.onProfileUpdate();
    this.a.toast(this.a.tr.t({ ko: '회원 정보를 수정하였습니다.', en: 'Your profile has been successfully updated.' }));
  }

  // onChangePrimaryPhoto(event: Event) {
  //   this.philgo.uploadPrimaryPhotoWeb(event.target['files']).subscribe(re => {
  //     // console.log(event);
  //     if (typeof re === 'number') {
  //       // console.log(`File is ${re}% uploaded.`);
  //       this.percentage = re;
  //     } else if (re['code'] && re['idx'] === void 0) {
  //       // console.log('error: ', re);
  //     } else if (re['idx'] !== void 0 && re['idx']) {
  //       // console.log('file upload success: ', re);
  //       // this.photo = re;
  //       this.form.url_profile_photo = re['url'];
  //       this.percentage = 0;
  //     }
  //   }, (e: HttpErrorResponse) => {
  //     // console.log('error subscribe: ', e);
  //     if (e.error instanceof Error) {
  //       // console.log('Client-side error occurred.');
  //     } else {
  //       // console.log(err);
  //       if (e.message === ApiErrorFileNotSelected) {
  //         // console.log('file is not selected');
  //       } else if (e['code'] !== void 0 && e['code'] === ApiErrorFileUploadError) {
  //         // console.log('File upload error:', e.message);
  //       } else {
  //         // console.log('FILE TOO LARGE' + e.message);
  //       }
  //     }
  //     // console.log('file upload failed');
  //   });
  // }

  // onClickDeletePrimaryPhoto() {
  //   const idx = this.form.url_profile_photo.split('/').pop();
  //   this.philgo.deleteFile(parseInt(idx, 10)).subscribe(res => {
  //     // console.log('res: ', res);
  //     this.form.url_profile_photo = '';
  //   }, e => alert(e.message));
  // }

}
