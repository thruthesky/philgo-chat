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

  async toast( message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 7000,
      showCloseButton: true,
      closeButtonText: 'Close'
    });
    toast.present();
  }
}
