import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { JobPage } from './job.page';

import { JobListComponentModule } from '../../modules/components/forum/job/list/job-list.component.module';

const routes: Routes = [
  {
    path: '',
    component: JobPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    JobListComponentModule
  ],
  declarations: [JobPage]
})
export class JobPageModule {}
