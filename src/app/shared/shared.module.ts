import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LengthHintPipe } from './length-hint.pipe';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LengthHintPipe
  ],
  exports: [
    LengthHintPipe,
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
