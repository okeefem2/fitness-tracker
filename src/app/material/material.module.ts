import { NgModule } from '@angular/core';
import { 
  MatButtonModule, 
  MatIconModule, 
  MatFormFieldModule, 
  MatInputModule, 
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  FlexLayoutModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule
];
@NgModule({
  imports: materialModules,
  exports: materialModules
})
export class MaterialModule { }
