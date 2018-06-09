import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth/auth-guard.service';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'training', loadChildren: './training/training.module#TrainingModule', canLoad: [AuthGuardService] }
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
