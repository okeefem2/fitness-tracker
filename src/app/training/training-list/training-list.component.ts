import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'training-list',
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.css']
})
export class TrainingListComponent implements OnInit, AfterViewInit {
  public exercisesSource = new MatTableDataSource<Exercise>();
  public displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private exercisesSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.trainingService.fetchCompletedExercises();
    // Todo something going on with the timestamps here :(
    this.exercisesSubscription = this.trainingService.completedExercisesChanged.subscribe(exercises => {
      exercises.map(e => {
        e.date = e.date ? new Date(e.date) : null;
        this.exercisesSource.data = exercises;
      });
    });
  }

  ngAfterViewInit() {
    this.exercisesSource.sort = this.sort;
    this.exercisesSource.paginator = this.paginator;
  }

  filter(filterValue: string) {
    this.exercisesSource.filter = filterValue.trim().toLowerCase();
  }
}
