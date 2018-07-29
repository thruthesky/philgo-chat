import { Injectable } from '@angular/core';
import { ToastController } from '../../../node_modules/@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(
    readonly toastController: ToastController
  ) { }

  version(): string {
    return '0.1';
  }

  /**
   *
   * @param o string or object.
   *  if it is an object,
   *    {
   *      code: number,   // if code is not 0, it means, error.
   *      message: string,
   *      closeButtonText: string   // customize close button text.
   *      duration: number          // ms. default is 10000(10s). you can put it big number for test.
   *    }
   *
   * @example
      e.duration = 100000;
      this.a.toast(e);

   * @description If the toast is an error toast
   *    <ion-toast class="error errorNO"> will be added in class.
   *    Normally error code is like -1234, so, the error class will be 'error error-1324'
   */
  async toast( o: any) {
    console.log('o: ', o);
    if ( typeof o === 'string' ) {
      console.log('o is tring');
      o = {
        message: o
      };
    }
    if ( o.closeButtonText === void 0 ) {
      o.closeButtonText = 'Close';
    }
    if ( o.duration === void 0 ) {
      o.duration = 10000;
    }
    if ( typeof o.code !== void 0 && o.code ) {
      o.cssClass = `error error${o.code}`;
    }
    o.showCloseButton = true;
    console.log('o: ', o);
    const toast = await this.toastController.create(o);
    toast.present();
  }
}
