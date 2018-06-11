import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

/**
 * Mat dialog component!
 */
@Component({
  selector: 'app-stop-training',
  template: `<h1 mat-dialog-title>Do you throw yourself at the mercy of the Glow Cloud?</h1>
  <mat-dialog-content>
    <p>You made it {{ data.progress }}% before buckling under the weight of their power</p>
  </mat-dialog-content>
            <mat-dialog-actions>
              <button mat-raised-button color="accent" [mat-dialog-close]="true">ALL HAIL</button>
              <button mat-raised-button color="warn" [mat-dialog-close]="false">FOR SCIENCE I FIGHT</button>
            </mat-dialog-actions>`
})
export class StopTrainingComponent {
  /**
   * 
   * @param data Injects data for the dialog
   */
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }
}
