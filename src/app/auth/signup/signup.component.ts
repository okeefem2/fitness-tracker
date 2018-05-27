import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  public signupForm: FormGroup;
  public maxDate;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit() {
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
    let message = 'There is an issue with the data entered, please review and try again.';
    if (this.signupForm.valid) {
      message = 'Thanks for signing up!';
      this.authService.registerUser(this.signupForm.value);
    }
    this.snackBar.open(message, 'dismiss', {
      duration: 5000
    });
  }

  getControl(control: string): AbstractControl {
    return this.signupForm.get(control);
  }

  getControlError(control: string, error: string): boolean {
    return this.getControl(control).errors && this.getControl(control).errors[error];
  }
}
