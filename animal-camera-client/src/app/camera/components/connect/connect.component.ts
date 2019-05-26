import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup, FormControl } from '@angular/forms';
import { ConnectionService } from '../../../shared/services/connection.service';
import { ConnectionStore } from '../../../shared/stores/connection.store';
import { Router } from '@angular/router';

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

    this.connectionService.pingDevice(combinedAddress).subscribe(result => {
      console.log(result);
      this.cookieService.set('address', address);
      this.cookieService.set('port', port);

      this.connectionStore.updateConnectionStatus(combinedAddress, true);
      this.router.navigate(['/camera/info']);
    },
      error => {
        console.log("Unable to connect.");
      });
  }
}
