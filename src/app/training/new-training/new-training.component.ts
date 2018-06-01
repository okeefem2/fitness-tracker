import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { UIService } from '../../shared/ui.service';

@Component({
  selector: 'new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  public exercises$ = new Observable<Exercise[]>();
  public exerciseForm: FormGroup;
  public isLoading = false;
  private loadingStateSubscription: Subscription;
  constructor(private trainingService: TrainingService, private fb: FormBuilder, private uiService: UIService) { }

  ngOnInit() {
    this.loadingStateSubscription = this.uiService.loadingStateChanged.subscribe(state => this.isLoading = state);
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
    this.loadingStateSubscription.unsubscribe();
  }

  public fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
}
