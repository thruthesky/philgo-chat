import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'my-rooms', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'my-rooms', loadChildren: './pages/rooms/rooms.module#RoomsPageModule', data: { mode: 'my' } },
  { path: 'all-rooms', loadChildren: './pages/rooms/rooms.module#RoomsPageModule', data: { mode: 'all' } },
  { path: 'room/:idx_chat_room', loadChildren: './pages/room/room.module#RoomPageModule' },
  { path: 'create-room', loadChildren: './pages/create-room/create-room.module#CreateRoomPageModule' },
  { path: 'help', loadChildren: './pages/help/help.module#HelpPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
