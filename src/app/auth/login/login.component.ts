import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UIService } from '../../shared/ui.service';
import { Subscription, Observable } from 'rxjs';
import { State, getIsLoading } from '../../app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public maxDate;
  public isLoading$: Observable<boolean>;
  private loadingStateSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private uiService: UIService,
    private store: Store<{ ui: State}>) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);
    // this.loadingStateSubscription = this.uiService.loadingStateChanged.subscribe(state => this.isLoading = state);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }

  getControl(control: string): AbstractControl {
    return this.loginForm.get(control);
}

  getControlError(control: string, error: string): boolean {
    return this.getControl(control).errors && this.getControl(control).errors[error];
  }

  ngOnDestroy() {
    this.loadingStateSubscription && this.loadingStateSubscription.unsubscribe();
  }

}
