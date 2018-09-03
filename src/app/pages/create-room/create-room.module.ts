import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateRoomPage } from './create-room.page';
import { ChatCreateRoomComponentModule } from '../../modules/components/chat/chat-create-room/chat-create-room.component.module';


const routes: Routes = [
  {
    path: '',
    component: CreateRoomPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ChatCreateRoomComponentModule
  ],
  declarations: [CreateRoomPage]
})
export class CreateRoomPageModule {}
