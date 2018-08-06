import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PhilGoApiModule, PhilGoApiService } from './modules/philgo-api-v3/philgo-api.module';
import { Camera } from '@ionic-native/camera/ngx';
import { environment } from '../environments/environment';


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
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(philgo: PhilGoApiService) {
    // philgo.setServerUrl('http://192.168.0.182/sapcms_1_2/api.php');
    // /**
    //  * Philgo API file server url. Must end with 'indx.php'.
    //  */
    // philgo.setFileServerUrl('http://192.168.0.182/sapcms_1_2/index.php');
    // /**
    //  * New File Server End Ponit
    //  */
    // philgo.setNewFileServerUrl('http://192.168.0.182/file-server/index.php');


    philgo.setServerUrl(environment.philgoServerUrl);
    /**
     * Philgo API file server url. Must end with 'indx.php'.
     */
    philgo.setFileServerUrl(environment.philgoFileServerUrl);
    philgo.setNewFileServerUrl(environment.newFileServerUrl);
  }
}
