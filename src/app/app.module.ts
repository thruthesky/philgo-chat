import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera } from '@ionic-native/camera/ngx';
import { environment } from '../environments/environment';

import * as firebase from 'firebase/app';
import { PhilGoApiService } from './modules/philgo-api/philgo-api.service';
import { HttpClientModule } from '@angular/common/http';

const firebaseConfig = {
  apiKey: 'AIzaSyA1X3vpzSpUk_JHCbNjEwQe1-pduF0Enqs',
  authDomain: 'philgo-64b1a.firebaseapp.com',
  databaseURL: 'https://philgo-64b1a.firebaseio.com',
  projectId: 'philgo-64b1a',
  storageBucket: 'philgo-64b1a.appspot.com',
  messagingSenderId: '675064809117'
};
firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
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
  constructor(private philgo: PhilGoApiService) {
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
    // philgo.db = firebase.database().ref('/');
    philgo.setFirebaseApp(firebase);
    // philgo.loadPostConfigs().subscribe(res => { });
    philgo.appConfigs('philgo-chat').subscribe(res => {
      this.philgo.app = res;
      if ( res.postConfigs ) {
        this.philgo.postConfigs = res.postConfigs;
      }
    }, e => {});
  }
}
