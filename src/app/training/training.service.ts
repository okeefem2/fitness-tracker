import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  public exerciseChanged = new Subject<Exercise>();
  private availableExercises: Exercise[] = [
    { id: 'push-ups', name: 'Push Ups', duration: 60, calories: 10 },
    { id: 'pull-ups', name: 'Pull Ups', duration: 30, calories: 10 },
    { id: 'burpees', name: 'Burpees', duration: 120, calories: 20 },
  ];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];
  constructor() { }

  public getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice();
  }

  public startExercise(id: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === id);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  public getRunningExercise(): Exercise {
    return { ...this.runningExercise };
  }

  public cancelExercise(fractionCompleted: number) {

    this.exercises.push({ 
      ...this.runningExercise, 
      state: 'cancelled', 
      duration: this.runningExercise.duration * fractionCompleted, 
      calories: this.runningExercise.calories * fractionCompleted,
      date: new Date() });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public completeExercise() {
    this.exercises.push({ ...this.runningExercise, state: 'completed', date: new Date() });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public getCompletedExercises() {
    return this.exercises;
  }
}
