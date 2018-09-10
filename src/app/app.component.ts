import { Component, AfterViewInit, ViewChild } from '@angular/core';

import { Platform, Menu } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppService } from './providers/app.service';
import { LanguageTranslate } from './modules/language-translate/language-translate';
import { PhilGoApiService } from './modules/philgo-api/philgo-api.service';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements AfterViewInit {

  @ViewChild(Menu) menu: Menu;
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

    a.toggleMenu.subscribe(() => {
      this.menu.toggle();
    });
  }

  ngAfterViewInit() {

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
