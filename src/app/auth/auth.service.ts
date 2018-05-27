import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  public authStateChanged = new Subject<User>();
  constructor(private router: Router, private snackBar: MatSnackBar) { }

  public registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      uid: Math.round(Math.random() * 10000).toString()
    }
    this.authStateChanged.next(this.user);
    this.authSuccess();
  }

  public login(authData: AuthData) {
    this.registerUser(authData);
  }

  public logout() {
    this.user = null;
    this.authStateChanged.next(this.user);
    this.router.navigate(['/login']);
    this.snackBar.open('Until next time...', 'dismiss', {
      duration: 5000
    });
  }

  public getUser(): User {
    return { ...this.user };
  }

  public isAuth() {
    return this.user != null;
  }

  private authSuccess() {
    this.router.navigate(['/training']);
  }
}
