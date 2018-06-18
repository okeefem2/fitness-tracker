import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { State, getIsAuthenticated } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() public toggleSideNav = new EventEmitter<void>();
  constructor(private store: Store<State>, private authService: AuthService) { }

  public isAuthenticated$: Observable<boolean>;
  private authSubscription: Subscription;
  ngOnInit() {
    this.isAuthenticated$ = this.store.select(getIsAuthenticated);
    // this.authSubscription = this.authService.authStateChanged.subscribe(isAuthenticated => {
    //   this.isAuthenticated = isAuthenticated;
    // });
  }

  ngOnDestroy() {
    this.authSubscription && this.authSubscription.unsubscribe();
  }

  public onToggleSideNav() {
    this.toggleSideNav.emit();
  }

  public logout() {
    this.authService.logout();
  }
}
