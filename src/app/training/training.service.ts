import { Injectable } from '@angular/core';
import { Exercise } from './exercise.model';
import { Subject, Observable, Subscription, throwError, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FireStoreUtils } from '../utils/firestore-utils';
import { UIService } from '../shared/ui.service';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { switchMap, throttle } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../app.reducer';
import { StartLoading, StopLoading } from '../shared/ui.actions';
@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  public exerciseChanged = new Subject<Exercise>();
  public availableExercisesChanged = new Subject<Exercise[]>();
  public completedExercisesChanged = new Subject<Exercise[]>();
  private firestoreSubscriptions = new Subscription();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private completedExercisesRef: AngularFirestoreCollection<Exercise>;
  private availableExercisesRef: AngularFirestoreCollection<Exercise>;
  constructor(
    private firestore: AngularFirestore, 
    private uiService: UIService,
    private store: Store<{ ui: State }>
  ) { 
    this.completedExercisesRef = this.firestore.collection<Exercise>('completedExercises');
    this.availableExercisesRef = this.firestore.collection<Exercise>('availableExercises');
  }

  public fetchAvailableExercises(): void {
    this.store.dispatch(new StartLoading());
    // this.uiService.loadingStateChanged.next(true);
    // return this.availableExercises.slice(); use slice so that the member array is immutable outside of the service
    this.firestoreSubscriptions.add(FireStoreUtils.unwrapCollectionSnapshot(
      this.availableExercisesRef.snapshotChanges()
    )
    // .pipe(
    //   switchMap(e => ErrorObservable.create('error')) // have to use switchmap, regular map only modifies and sends the og through modified
    // )
    .subscribe((exercises: any) => {
      this.store.dispatch(new StopLoading());
      // this.uiService.loadingStateChanged.next(false);
      this.availableExercises = exercises;
      this.availableExercisesChanged.next(this.availableExercises);
    }, error => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new StopLoading());
      this.uiService.showSnackBar(`The Sheriff's secret police are on to you... ${error}`, 'dismiss', 5000);
      this.availableExercisesChanged.next(null);
    }));
  }

  public startExercise(id: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === id);
    this.availableExercisesRef.doc(id).update({ lastSelected: new Date() });
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  public getRunningExercise(): Exercise {
    return { ...this.runningExercise };
  }

  public cancelExercise(fractionCompleted: number) {
    this.addCompletedExercise({ 
      ...this.runningExercise, 
      state: 'cancelled', 
      duration: this.runningExercise.duration * fractionCompleted, 
      calories: this.runningExercise.calories * fractionCompleted,
      date: new Date() });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public completeExercise() {
    this.addCompletedExercise({ ...this.runningExercise, state: 'completed', date: new Date() });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  public fetchCompletedExercises(): void {
    this.firestoreSubscriptions.add(
      this.completedExercisesRef.valueChanges().subscribe(
        completedExercises => {
          this.completedExercisesChanged.next(completedExercises);
        }
      )
    );
  }

  public addCompletedExercise(exercise: Exercise) {
    this.completedExercisesRef.add(exercise);
  }

  public cancelSubscriptions() {
    this.firestoreSubscriptions.unsubscribe();
  }
}
