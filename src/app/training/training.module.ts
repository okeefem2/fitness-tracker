import { NgModule } from '@angular/core';
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { SharedModule } from '../shared/shared.module';
import { TrainingRoutingModule } from './/training-routing.module';

@NgModule({
  imports: [
    SharedModule,
    TrainingRoutingModule
  ],
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    TrainingListComponent
  ]
})
export class TrainingModule { }
