import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

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

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercisesSource.data = this.trainingService.getCompletedExercises();
  }

  ngAfterViewInit() {
    this.exercisesSource.sort = this.sort;
    this.exercisesSource.paginator = this.paginator;
  }

  filter(filterValue: string) {
    this.exercisesSource.filter = filterValue.trim().toLowerCase();
  }
}
