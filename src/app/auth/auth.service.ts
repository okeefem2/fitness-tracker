import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authStateChanged = new Subject<boolean>();
  public isAuthenticated = false;
  constructor(
    private uiService: UIService,
    private trainingService: TrainingService,
    private afAuth: AngularFireAuth,
    private router: Router, 
    private snackBar: MatSnackBar) { 
      this.initAuthStateListener();
    }

  public registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password).then(user => {
      this.uiService.loadingStateChanged.next(false);
    }).catch(e => {
      this.uiService.loadingStateChanged.next(false);
      this.snackBar.open(`Dogs are not allowed in the dog park... ${e}`, 'dismiss', {
        duration: 5000
      });
    });;
  }

  public login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password).then(user => {
      this.uiService.loadingStateChanged.next(false);
    }).catch(e => {
      this.uiService.loadingStateChanged.next(false);
      this.snackBar.open(`Dogs are not allowed in the dog park... ${e}`, 'dismiss', {
        duration: 5000
      });
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
        this.isAuthenticated = true;
        this.authStateChanged.next(this.isAuthenticated);
        this.router.navigate(['/training']);
        this.snackBar.open('Welcome', 'dismiss', {
          duration: 5000
        });
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authStateChanged.next(this.isAuthenticated);
        this.router.navigate(['/login']);
        this.snackBar.open('Until next time...', 'dismiss', {
          duration: 5000
        });
      }
    });
  }
}
