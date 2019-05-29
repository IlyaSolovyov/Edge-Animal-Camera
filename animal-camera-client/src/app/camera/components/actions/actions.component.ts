import { Component } from '@angular/core';

@Component({
  selector: 'camera-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  links = [
    { path: "encounters", label: "Download encounter log" },
    { path: "test", label: "Perform test detection" }
  ];

  activeLink = this.links[0];

  constructor() {

  }
}
