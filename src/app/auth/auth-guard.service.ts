import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { State, getIsAuthenticated } from '../app.reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanLoad {

  public constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
    private store: Store<State>
  ) { }

  public canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select(getIsAuthenticated).pipe(
      take(1)
    );
    // if (this.authService.isAuth()) {
    //   return true;
    // }
    // this.snackBar.open('Humans are not allowed in the dog park...', 'dismiss', {
    //   duration: 5000
    // });
    // this.router.navigate(['/login']);
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.store.select(getIsAuthenticated).pipe(
      take(1)
    );
    // console.log(this.authService.isAuth());
    // if (this.authService.isAuth()) {
    //   return true;
    // }
    // this.snackBar.open('Humans are not allowed in the dog park...', 'dismiss', {
    //   duration: 5000
    // });
    // this.router.navigate(['/login']);
  }
}
