import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', loadChildren: './pages/my-rooms/my-rooms.module#MyRoomsPageModule' },
  { path: 'my-rooms', loadChildren: './pages/my-rooms/my-rooms.module#MyRoomsPageModule' },
  // { path: '', pathMatch: 'full', redirectTo: 'my-rooms' },
  // { path: '', pathMatch: 'full', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule' },
  { path: 'register', loadChildren: './pages/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  // { path: 'my-rooms', loadChildren: './pages/rooms/rooms.module#RoomsPageModule', data: { mode: 'my' } },
  // { path: 'all-rooms', loadChildren: './pages/rooms/rooms.module#RoomsPageModule', data: { mode: 'all' } },
  { path: 'room/:idx_chat_room', loadChildren: './pages/room/room.module#RoomPageModule' },
  { path: 'create-room', loadChildren: './pages/create-room/create-room.module#CreateRoomPageModule' },
  { path: 'help', loadChildren: './pages/help/help.module#HelpPageModule' },
  { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule' },
  { path: 'all-rooms', loadChildren: './pages/all-rooms/all-rooms.module#AllRoomsPageModule' },
  { path: 'setting-dev-info', loadChildren: './pages/setting-dev-info/setting-dev-info.module#SettingDevInfoPageModule' },
  { path: 'setting-language', loadChildren: './pages/setting-language/setting-language.module#SettingLanguagePageModule' },
  { path: 'room/:idx_chat_room/setting', loadChildren: './pages/setting-room/setting-room.module#SettingRoomPageModule' },
  { path: 'forum/:post_id', loadChildren: './pages/forum/forum.module#ForumPageModule' },
  { path: 'forum/:post_id/:idx', loadChildren: './pages/forum/forum.module#ForumPageModule' },
  { path: 'job/:category', loadChildren: './pages/job/job.module#JobPageModule' },
  { path: 'job/:category/:idx', loadChildren: './pages/job/job.module#JobPageModule' },
  { path: 'hub', loadChildren: './pages/hub/hub.module#HubPageModule' },
  { path: 'ads', loadChildren: './pages/ads/ads.module#AdsPageModule' },
  { path: 'ads/:idx', loadChildren: './pages/ads-view/ads-view.module#AdsViewPageModule' },
  { path: '**', loadChildren: './pages/page-not-found/page-not-found.module#PageNotFoundPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
