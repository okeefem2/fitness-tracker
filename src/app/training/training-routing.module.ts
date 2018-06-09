import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { TrainingComponent } from './training.component';
import { AuthGuardService } from '../auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: TrainingComponent, canActivate: [AuthGuardService] }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TrainingRoutingModule { }
