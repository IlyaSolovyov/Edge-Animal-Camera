import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '../../../../node_modules/@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ConnectionService {

  constructor(protected http: HttpClient) { }

  pingDevice(address: string): Observable<string> {
    return this.http.get<string>(address + '/ping');
  }
}
