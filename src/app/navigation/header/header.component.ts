import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Output() public toggleSideNav = new EventEmitter<void>();
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

  public onToggleSideNav() {
    this.toggleSideNav.emit();
  }

  public logout() {
    this.authService.logout();
  }
}
