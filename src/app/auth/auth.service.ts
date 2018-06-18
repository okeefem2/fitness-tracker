import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import { State } from '../app.reducer';
import { StartLoading, StopLoading } from '../shared/ui.actions';
import { Login, Logout } from './auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // public authStateChanged = new Subject<boolean>();
  public isAuthenticated = false;
  constructor(
    private uiService: UIService,
    private trainingService: TrainingService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private store: Store<{ ui: State }>
  ) {
      this.initAuthStateListener();
    }

  public registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new StartLoading());
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(user => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new StopLoading());

    }).catch(e => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new StopLoading());
      this.uiService.showSnackBar(`Dogs are not allowed in the dog park... ${e}`, 'dismiss', 5000);
    });
  }

  public login(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new StartLoading());

    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(user => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new StopLoading());
    }).catch(e => {
      // this.uiService.loadingStateChanged.next(false);
      this.store.dispatch(new StopLoading());
      this.uiService.showSnackBar(`Dogs are not allowed in the dog park... ${e}`, 'dismiss', 5000);
    });
  }

  public logout() {
    this.afAuth.auth.signOut();
  }

  public isAuth(): boolean {
    return this.isAuthenticated;
  }

  public initAuthStateListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Login());
        // this.isAuthenticated = true;
        // this.authStateChanged.next(this.isAuthenticated);
        this.router.navigate(['/training']);
        this.uiService.showSnackBar('Welcome', 'dismiss', 5000);

      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Logout());
        // this.isAuthenticated = false;
        // this.authStateChanged.next(this.isAuthenticated);
        this.router.navigate(['/login']);
        this.uiService.showSnackBar('Until next time...', 'dismiss', 5000);
      }
    });
  }
}
