import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  public training = false;
  constructor() { }

  ngOnInit() {
  }

  onStartTraining() {
    console.log('start training');
    this.training = true;
  }

  onStopTraining() {
    this.training = false;
  }

}
