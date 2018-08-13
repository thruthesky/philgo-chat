import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService } from '../../modules/philgo-api-v3/philgo-api.module';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html'
})
export class SettingPage implements OnInit {

  isCordova = !! window.cordova;
  locationHref = '';
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    this.locationHref = location.href;
  }

  ngOnInit() {
  }

}
