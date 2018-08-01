import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateRoomPage } from './create-room.page';
import { CreateRoomComponent } from '../../components/create-room/create-room.component';

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
    RouterModule.forChild(routes)
  ],
  declarations: [CreateRoomPage, CreateRoomComponent]
})
export class CreateRoomPageModule {}
