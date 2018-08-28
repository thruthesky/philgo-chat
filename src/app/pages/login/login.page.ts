import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { Router } from '@angular/router';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html'
})
export class LoginPage implements OnInit {

  uid = '';
  password = '';
  loader = {
    submit: false
  };
  constructor(
    private router: Router,
    public a: AppService,
    public philgo: PhilGoApiService
  ) { }

  ngOnInit() {
  }

  onLogin() {
    this.a.onLogin();
    this.a.openHome();
  }
}
