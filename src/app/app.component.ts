import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { PhilGoApiService } from './modules/philgo-api-v3/philgo-api.module';
import { Router } from '../../node_modules/@angular/router';
import { AppService } from './providers/app.service';
import { LanguageTranslate } from './modules/language-translate/language-translate';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private readonly router: Router,
    public readonly philgo: PhilGoApiService,
    public a: AppService,
    public lt: LanguageTranslate
  ) {
    this.initializeApp();
    this.lt.languageCode = 'ko';
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onClickLogout() {
    this.philgo.logout();
    this.a.onLogout();
    this.router.navigateByUrl('/');
  }

}
