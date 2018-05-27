import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() public startTraining = new EventEmitter<void>();
  constructor(private trainingService: TrainingService) { }
  public exercises: Exercise[];

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  public onStartTraining() {
    this.startTraining.emit();
  }
}
