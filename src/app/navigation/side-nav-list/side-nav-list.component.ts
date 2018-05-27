import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.css']
})
export class SideNavListComponent implements OnInit, OnDestroy {
  
  @Output() public closeSideNav = new EventEmitter<void>();
  constructor(private authService: AuthService) { }

  public isAuthenticated: boolean;
  private authSubscription: Subscription;
  ngOnInit() {
    this.authSubscription = this.authService.authStateChanged.subscribe(user => {
      this.isAuthenticated = user != null;
    })
  }

  ngOnDestroy() {
    this.authSubscription && this.authSubscription.unsubscribe();
  }

  public onCloseSideNav() {
    this.closeSideNav.emit();
  }

  public logout() {
    this.authService.logout();
  }
}
