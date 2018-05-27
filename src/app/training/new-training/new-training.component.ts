import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  constructor(private trainingService: TrainingService, private fb: FormBuilder) { }
  public exercises: Exercise[];
  public exerciseForm: FormGroup;

  ngOnInit() {
    this.exerciseForm = this.fb.group({
      exerciseId: ['', [Validators.required]]
    });
    this.exercises = this.trainingService.getAvailableExercises();
  }

  public onStartTraining() {
    if (this.exerciseForm.valid) {
      this.trainingService.startExercise(this.exerciseForm.value.exerciseId);
    }
  }
}
