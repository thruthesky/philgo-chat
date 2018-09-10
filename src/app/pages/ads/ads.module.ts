import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdsPage } from './ads.page';
import { AdsListComponentModule } from '../../modules/components/forum/ads/list/ads-list.component.module';

const routes: Routes = [
  {
    path: '',
    component: AdsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    AdsListComponentModule
  ],
  declarations: [AdsPage]
})
export class AdsPageModule {}
