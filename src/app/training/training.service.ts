import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private availableExercises: Exercise[] = [
    { id: 'push-ups', name: 'Push Ups', duration: 60, calories: 10 },
    { id: 'pull-ups', name: 'Pull Ups', duration: 30, calories: 10 },
    { id: 'burpees', name: 'Burpees', duration: 120, calories: 20 },
  ];
  constructor() { }

  public getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice();
  }

}
