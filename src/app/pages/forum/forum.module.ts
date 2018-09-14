import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ForumPage } from './forum.page';
import { ForumBasicListComponentModule } from '../../modules/components/forum/basic/list/basic-list.component.module';
import { LoaderComponentModule } from '../../components/loader/loader.component.module';

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
    ForumBasicListComponentModule,
    LoaderComponentModule
  ],
  declarations: [ForumPage]
})
export class ForumPageModule { }
