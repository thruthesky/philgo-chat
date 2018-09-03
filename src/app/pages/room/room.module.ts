import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { RoomPage } from './room.page';
import { ChatRoomMessagesComponentModule } from '../../modules/components/chat/chat-room-messages/chat-room-messages.component.module';
import { ChatRoomInputComponentModule } from '../../modules/components/chat/chat-room-input/chat-room-input.component.module';
import { ReminderPopoverComponent } from './reminder-popover/reminder-popover.component';

const routes: Routes = [
  {
    path: '',
    component: RoomPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ChatRoomMessagesComponentModule,
    ChatRoomInputComponentModule
  ],
  declarations: [RoomPage, ReminderPopoverComponent],
  entryComponents: [
    ReminderPopoverComponent
  ]
})
export class RoomPageModule { }
