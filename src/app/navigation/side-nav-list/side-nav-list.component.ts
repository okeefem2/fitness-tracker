import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'side-nav-list',
  templateUrl: './side-nav-list.component.html',
  styleUrls: ['./side-nav-list.component.css']
})
export class SideNavListComponent implements OnInit {

  @Output() public closeSideNav = new EventEmitter<void>();
  constructor() { }

  ngOnInit() {
  }

  public onCloseSideNav() {
    this.closeSideNav.emit();
  }

}
