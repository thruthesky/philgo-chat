import { Component, OnInit } from '@angular/core';
import { PhilGoApiService } from '../../modules/philgo-api-v3/philgo-api.module';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  isLoggedIn = false;
  form = {
    email: '',
    password: '',
    name: '',
    nickname: '',
    mobile: ''
  };
  loader = {
    profile: false
  };

  constructor(
    public philgo: PhilGoApiService
  ) {

    this.isLoggedIn = this.philgo.isLoggedIn();
    if (philgo.isLoggedIn()) {
      this.loader.profile = true;
      philgo.profile().subscribe(user => {
        this.loader.profile = false;
        this.form = user;
        console.log('user: ', user);
      }, e => alert(e.message));
    }

  }

  ngOnInit() {
  }

  onSubmit(event?: Event) {
    if (event) {
      event.preventDefault();
    }


    console.log('di?', this.form);
    if (this.philgo.isLoggedIn) {
      console.log('going to update profile');
    } else {
      console.log('going to register');
    }

    return false;
  }
}
