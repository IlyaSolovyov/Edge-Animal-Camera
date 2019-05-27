import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ConnectionService } from '../../../shared/services/connection.service';
import { ConnectionStore } from '../../../shared/stores/connection.store';
import { Device } from '../../../shared/models/device';

@Component({
  selector: 'camera-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit {
  connectForm: FormGroup;

  constructor(
    private cookieService: CookieService,
    private connectionService: ConnectionService,
    private connectionStore: ConnectionStore,
    private router: Router) { }

  ngOnInit(): void {
    let address: string = '';
    let port: string = '';

    if (this.cookieService.check('address')) {
      address = this.cookieService.get('address');
    }

    if (this.cookieService.check('port')) {
      port = this.cookieService.get('port');
    }

    this.connectForm = new FormGroup({
      addressControl: new FormControl(address),
      portControl: new FormControl(port),
    });
  }

  connect(): void {
    let address: string = this.connectForm.get('addressControl').value;
    let port: string = this.connectForm.get('portControl').value;
    let combinedAddress = address + ":" + port;

    console.log("Pinging " + combinedAddress + " address...");

    this.connectionService.pingDevice(combinedAddress).subscribe(device => {
      let deviceEntity: Device = new Device(device.camera, device.supportedClasses);
      console.log("Received following device information:");
      console.log(deviceEntity);

      this.cookieService.set('address', address);
      this.cookieService.set('port', port);

      this.connectionStore.updateConnectionStatus(combinedAddress, deviceEntity, true);
      this.router.navigate(['/camera/info']);
    },
      error => {
        console.log("Unable to connect.");
      });
  }
}
