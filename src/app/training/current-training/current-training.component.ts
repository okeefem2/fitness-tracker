import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { scan, takeWhile } from 'rxjs/operators';
import { MatSnackBar, MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { Store } from '@ngrx/store';
import { TrainingState, getActiveExercise } from '../training.reducer';

@Component({
  selector: 'current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  public progress = 0;
  public exercise: Exercise;
  private progressSubscription: Subscription;

  constructor(private snackBar: MatSnackBar,
              private dialog: MatDialog,
              private trainingService: TrainingService,
              private store: Store<TrainingState>) { }

  ngOnInit() {
    this.store.select(getActiveExercise).subscribe(exercise => {
      debugger;
      this.exercise = exercise;
      this.exercise && this.startTimer();
    });
  }

  ngOnDestroy() {
    this.progressSubscription.unsubscribe();
  }

  startTimer() {
    const progressPerInterval = +((1000 / (this.exercise.duration * 1000) * 100).toFixed(0));
    this.progressSubscription = interval(1000).pipe(
      scan((progress, interval) => {
        progress += progressPerInterval;
        return progress;
      }, this.progress),
      takeWhile(progress => progress <= 100)
    ).subscribe(
      {
        next: (progress) => {
          this.progress = progress;
        },
        complete: () => {
          this.snackBar.open('You have successfully escaped the wrath of the Glow Cloud, for now...', 'dismiss', {
            duration: 5000
          });
          this.trainingService.completeExercise();
        }
      }
    );
  }


  onStopTraining() {
    this.progressSubscription.unsubscribe();
    const dialogRef = this.dialog.open(
      StopTrainingComponent, {
        data: {
          progress: this.progress
        }
      }
    );
    dialogRef.afterClosed().subscribe(answer => {
      if (answer) {
        this.snackBar.open('You will be pummeled to death by dead animals raining from the heavens', 'dismiss', {
          duration: 3000
        });
        this.trainingService.cancelExercise(this.progress / 100);
      } else {
        this.startTimer();
        this.snackBar.open('Your perfect hair and teeth like a military cemetery humble us', 'dismiss', {
          duration: 3000
        });
      }
    })
  }
}
