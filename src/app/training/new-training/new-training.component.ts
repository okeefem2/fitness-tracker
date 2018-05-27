import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  @Output() public startTraining = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  public onStartTraining() {
    this.startTraining.emit();
;  }

}
