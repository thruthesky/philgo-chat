import { Component, OnInit } from '@angular/core';
import { AppService } from '../../providers/app.service';
import { PhilGoApiService } from '../../modules/philgo-api/philgo-api.service';
import { Radio } from '@ionic/angular';

@Component({
  selector: 'app-setting-language',
  templateUrl: './setting-language.page.html',
  styleUrls: ['./setting-language.page.scss'],
})
export class SettingLanguagePage implements OnInit {


  constructor(
    public a: AppService,
    public philgo: PhilGoApiService
  ) { }

  ngOnInit() {
  }

  onIonSelect(event: Event) {
    const radio: HTMLInputElement = <any>event.target;
    // console.log('checked: ', radio.checked);
    // console.log('value:', radio.value);
    // console.log('Object Element: ', radio);
    this.philgo.setLanguage(radio.value).subscribe(res => {
      // console.log(res);
      this.a.tr.languageCode = radio.value;
    }, e => this.a.toast(e));
  }
}
