import { Component, OnInit } from '@angular/core';
import { PhilGoApiService } from '../../modules/philgo-api-v3/philgo-api.module';
import { AppService } from '../../providers/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email = '';
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
  onSubmit() {
    event.preventDefault();
    this.loader.submit = true;
    this.philgo.login({ email: this.email, password: this.password }).subscribe(res => {
        this.loader.submit = false;
        console.log('login success: ', res);
        this.router.navigateByUrl('/');
    }, e => {
        this.loader.submit = false;
        this.a.toast( e.message );
    });
    return false;
  }

}
