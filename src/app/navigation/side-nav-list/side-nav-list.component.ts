import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { State, getIsAuthenticated } from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.css']
})
export class SideNavListComponent implements OnInit, OnDestroy {

  @Output() public closeSideNav = new EventEmitter<void>();
  constructor(private authService: AuthService, private store: Store<State>) { }

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

  public onCloseSideNav() {
    this.closeSideNav.emit();
  }

  public logout() {
    this.authService.logout();
    this.onCloseSideNav();
  }
}
