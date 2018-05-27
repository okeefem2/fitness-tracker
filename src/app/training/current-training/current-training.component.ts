import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { scan, takeWhile } from 'rxjs/operators';
import { MatSnackBar, MatDialog } from '@angular/material';
import { StopTrainingComponent } from './stop-training/stop-training.component';

@Component({
  selector: 'current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit, OnDestroy {
  @Output() public stopTraining = new EventEmitter<void>();
  public progress = 0;
  private duration = 20000;
  private progressSubscription: Subscription;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.startTimer();
  }

  ngOnDestroy() {
    this.progressSubscription.unsubscribe();
  }

  startTimer() {
    const progressPerInterval = +((1000 / this.duration) * 100).toFixed(0);
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
        this.stopTraining.emit();
      } else {
        this.startTimer();
        this.snackBar.open('Your perfect hair and teeth like a military cemetery humble us', 'dismiss', {
          duration: 3000
        });
      }
    })
  }
}
