import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';
import { State, getIsLoading } from '../../app.reducer';

@Component({
  selector: 'new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  public exercises$ = new Observable<Exercise[]>();
  public exerciseForm: FormGroup;
  public isLoading$: Observable<boolean>;
  private loadingStateSubscription: Subscription;
  constructor(
    private trainingService: TrainingService, 
    private fb: FormBuilder, 
    private uiService: UIService,
    private store: Store<{ ui: State}>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);
    // this.loadingStateSubscription = this.uiService.loadingStateChanged.subscribe(state => this.isLoading = state);
    this.exerciseForm = this.fb.group({
      exerciseId: ['', [Validators.required]]
    });
    this.exercises$ = this.trainingService.availableExercisesChanged;
    this.fetchExercises();
  }

  public onStartTraining() {
    if (this.exerciseForm.valid) {
      this.trainingService.startExercise(this.exerciseForm.value.exerciseId);
    }
  }

  public ngOnDestroy() {
    this.loadingStateSubscription && this.loadingStateSubscription.unsubscribe();
  }

  public fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}
