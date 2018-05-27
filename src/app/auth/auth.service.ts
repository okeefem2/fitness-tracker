import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  public authStateChanged = new Subject<User>();
  constructor() { }

  public registerUser(authData: AuthData) {
    this.user = {
      email: authData.email,
      uid: Math.round(Math.random() * 10000).toString()
    }
    this.authStateChanged.next(this.user);
  }

  public login(authData: AuthData) {
    this.registerUser(authData);
  }

  public logout() {
    this.user = null;
    this.authStateChanged.next(this.user);
  }

  public getUser(): User {
    return { ...this.user };
  }

  public isAuth() {
    return this.user != null;
  }
}
