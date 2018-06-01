import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
@Injectable({
  providedIn: 'root'
})
export class UIService {
  public loadingStateChanged = new Subject<boolean>();
  constructor(private snackbar: MatSnackBar) { }

  showSnackBar(message: string, action: string, duration: number) {
    this.snackbar.open(message, action, {
      duration: duration
    });
  }
}
