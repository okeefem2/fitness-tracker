import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  public constructor(private authService: AuthService, private snackBar: MatSnackBar, private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    console.log(this.authService.isAuth());
    if (this.authService.isAuth()) {
      return true;
    }
    this.snackBar.open('Humans are not allowed in the dog park...', 'dismiss', {
      duration: 5000
    });
    this.router.navigate(['/login']);
  } 
}
