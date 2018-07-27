import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PhilGoApiModule, PhilGoApiService } from './modules/philgo-api-v3/philgo-api.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    PhilGoApiModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(philgo: PhilGoApiService) {
    philgo.setServerUrl('https://local.philgo.com/api.php');
    /**
     * Philgo API file server url. Must end with 'indx.php'.
     */
    philgo.setFileServerUrl('https://local.philgo.com/index.php');
  }
}
