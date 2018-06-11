import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription, Observable } from 'rxjs';
import { UIService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';
import { State, getIsLoading } from '../../app.reducer';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  
  public signupForm: FormGroup;
  public maxDate;
  public isLoading$: Observable<boolean>;
  private loadingStateSubscription: Subscription;
  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private uiService: UIService,
    private store: Store<{ ui: State}>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(getIsLoading);
    // this.loadingStateSubscription = this.uiService.loadingStateChanged.subscribe(state => this.isLoading = state);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.signupForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      birthdate: [null, [Validators.required]],
      agreedToTerms: [false, [Validators.requiredTrue]]
    });
  }

  public onSubmit() {
    if (this.signupForm.valid) {
      this.authService.registerUser(this.signupForm.value);
    }
  }

  getControl(control: string): AbstractControl {
    return this.signupForm.get(control);
  }

  getControlError(control: string, error: string): boolean {
    return this.getControl(control).errors && this.getControl(control).errors[error];
  }

  ngOnDestroy() {
    this.loadingStateSubscription && this.loadingStateSubscription.unsubscribe();
  }
}
