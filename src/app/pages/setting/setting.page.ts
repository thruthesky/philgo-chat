import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService } from '../../modules/philgo-api-v3/philgo-api.module';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html'
})
export class SettingPage implements OnInit {

  isCordova = false;
  locationHref = '';
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService,
    public platform: Platform
  ) {
    this.locationHref = location.href;
    this.platform.ready().then(() => {
      this.isCordova = this.platform.is('cordova');
    });
  }

  ngOnInit() {
  }

}
