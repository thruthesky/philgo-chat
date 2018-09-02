import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyRoomsPage } from './my-rooms.page';
import { ChatMyRoomsComponentModule } from '../../modules/components/chat/chat-my-rooms/chat-my-rooms.component.module';
import { ChatUpdateComponentModule } from '../../modules/components/chat/chat-update/chat-update.component.module';

const routes: Routes = [
  {
    path: '',
    component: MyRoomsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ChatMyRoomsComponentModule,
    ChatUpdateComponentModule
  ],
  declarations: [MyRoomsPage]
})
export class MyRoomsPageModule { }
