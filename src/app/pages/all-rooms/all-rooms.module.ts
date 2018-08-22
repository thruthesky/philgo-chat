import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AllRoomsPage } from './all-rooms.page';
import { ChatAllRoomsComponentModule } from '../../modules/components/chat-all-rooms/chat-all-rooms.component.module';
import { ChatUpdateComponentModule } from '../../modules/components/chat-update/chat-update.component.module';


const routes: Routes = [
  {
    path: '',
    component: AllRoomsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ChatAllRoomsComponentModule,
    ChatUpdateComponentModule
  ],
  declarations: [AllRoomsPage]
})
export class AllRoomsPageModule { }
