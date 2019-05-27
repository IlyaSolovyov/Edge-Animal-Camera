import { Component } from '@angular/core';
import { ConnectionStore } from '../../../shared/stores/connection.store';

@Component({
  selector: 'camera-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent{

  constructor(private connectionStore: ConnectionStore) {}

}
