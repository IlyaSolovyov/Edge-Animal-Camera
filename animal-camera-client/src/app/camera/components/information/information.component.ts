import { Component, OnInit } from '@angular/core';
import { ConnectionStore } from '../../../shared/stores/connection.store';
import { Device } from '../../../shared/models/device';

@Component({
  selector: 'camera-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {

  private device: Device;

  constructor(private connectionStore: ConnectionStore) {

  }

  ngOnInit() {
    this.connectionStore.device.subscribe(device => {
      console.log(device);
    })
  }
}
