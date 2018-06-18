import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { TrainingService } from './training.service';
import { TrainingState, getIsExercsing } from './training.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {
  public training$: Observable<boolean>;
  public exerciseChangedSubscription: Subscription;

  constructor(private trainingService: TrainingService, private store: Store<TrainingState>) { }

  ngOnInit() {
    this.training$ = this.store.select(getIsExercsing);
    // this.exerciseChangedSubscription = this.trainingService.exerciseChanged.subscribe(exercise => {
    //   this.training = exercise && exercise != null;
    // });
  }

  ngOnDestroy() {
    // this.exerciseChangedSubscription && this.exerciseChangedSubscription.unsubscribe();
  }

  // onStartTraining() {
  //   console.log('start training');
  //   this.training = true;
  // }

  // onStopTraining() {
  //   this.training = false;
  // }
}
