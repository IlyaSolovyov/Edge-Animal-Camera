import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { map } from 'rxjs/operators';
import { Device } from '../models/device';

@Injectable()
export class ConnectionService {

  constructor(protected http: HttpClient) { }

  pingDevice(address: string): Observable<Device> {
    return this.http.get<Device>('http://' + address + '/ping');
  }
}
