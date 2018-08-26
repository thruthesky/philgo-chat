import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { Platform } from '@ionic/angular';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.service';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss']
})
export class SettingPage implements OnInit {

  constructor(
    public a: AppService,
    public philgo: PhilGoApiService,
    public platform: Platform
  ) {
  }

  ngOnInit() {
  }

}
