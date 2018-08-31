import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForumPage } from './forum.page';
import { PostListModule } from '../../modules/components/forum/post-list/post-list.component.module';

const routes: Routes = [
  {
    path: '',
    component: ForumPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    PostListModule
  ],
  declarations: [ForumPage]
})
export class ForumPageModule { }
