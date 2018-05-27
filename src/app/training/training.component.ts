import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  public training = false;
  public exerciseChangedSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseChangedSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
      this.training = exercise && exercise != null;
    });
  }

  ngOnDestroy() {
    this.exerciseChangedSubscription && this.exerciseChangedSubscription.unsubscribe();
  }

  onStartTraining() {
    console.log('start training');
    this.training = true;
  }

  onStopTraining() {
    this.training = false;
  }

}
