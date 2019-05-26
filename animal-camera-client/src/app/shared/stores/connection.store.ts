import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class ConnectionStore {

  private _address: BehaviorSubject<string>;
  private _connected: BehaviorSubject<boolean>;

  constructor() {
    this._address = new BehaviorSubject<string>(null);
    this._connected = new BehaviorSubject<boolean>(null);
  }

  get address(): Observable<string> {
    return this.getAddressAsObservable(this._address);
  }

  get connected(): Observable<boolean> {
    return this.getConnectionStatusAsObservable(this._connected);
  }

  updateConnectionStatus(address: string, status: boolean) {
    this._address.next(address);
    this._connected.next(status);
  }

  private getAddressAsObservable(subject: Subject<string>): Observable<string> {
    return new Observable(fn => subject.subscribe(fn));
  }

  private getConnectionStatusAsObservable(subject: Subject<boolean>): Observable<boolean> {
    return new Observable(fn => subject.subscribe(fn));
  }

}
