import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.service';
import { AngularLibrary } from '../../modules/angular-library/angular-library';

@Component({
  selector: 'app-setting-dev-info',
  templateUrl: './setting-dev-info.page.html',
  styleUrls: ['./setting-dev-info.page.scss'],
})
export class SettingDevInfoPage implements OnInit {

  isCordova = AngularLibrary.isCordova();
  protocol = location.protocol;
  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) {
    console.log( location.href );
  }

  ngOnInit() {
  }

}
