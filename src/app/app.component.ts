import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '../../node_modules/@angular/router';
import { AppService } from './providers/app.service';
import { LanguageTranslate } from './modules/language-translate/language-translate';
import { PhilGoApiService } from './modules/philgo-api/philgo-api.service';
import { PhilGoApiTestService } from './modules/philgo-api/philgo-api.test';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public readonly philgo: PhilGoApiService,
    public a: AppService,
    public tr: LanguageTranslate,
    // private t: PhilGoApiTestService
  ) {
    this.initializeApp();

    // t.postSearch();

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onClickLogout() {
    this.philgo.logout();
    this.philgo.chatResetMyRooms();
    this.a.onLogout();
    this.a.openAllRooms();
  }

}
