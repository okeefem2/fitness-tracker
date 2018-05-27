import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public maxDate;
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private authService: AuthService) { }

  ngOnInit() {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public onSubmit() {
    let message = 'There is an issue with the data entered, please review and try again.';
    if (this.loginForm.valid) {
      message = 'Welcome!';
      this.authService.login(this.loginForm.value);
    }
    this.snackBar.open(message, 'dismiss', {
      duration: 5000
    });
  }

  getControl(control: string): AbstractControl {
    return this.loginForm.get(control);
  }

  getControlError(control: string, error: string): boolean {
    return this.getControl(control).errors && this.getControl(control).errors[error];
  }

}
