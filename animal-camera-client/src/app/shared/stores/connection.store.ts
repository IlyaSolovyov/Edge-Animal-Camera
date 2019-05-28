import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Device } from '../models/device';
import { ConnectionMode } from '../models/connection-mode';

@Injectable()
export class ConnectionStore {

  private _address: BehaviorSubject<string>;
  private _connectionMode: BehaviorSubject<string>;
  private _device: BehaviorSubject<Device>;

  constructor() {
    this._address = new BehaviorSubject<string>(null);
    this._connectionMode = new BehaviorSubject<string>(ConnectionMode.NotConnected);
    this._device = new BehaviorSubject<Device>(null);
  }

  get address(): Observable<string> {
    return this.getAddressAsObservable(this._address);
  }

  get connectionMode(): Observable<string> {
    return this.getConnectionModeAsObservable(this._connectionMode);
  }

  get device(): Observable<Device> {
    return this.getDeviceAsObservable(this._device);
  }

  updateConnectionMode(address: string, device:Device, connectionMode: string) {
    this._address.next(address);
    this._device.next(device);
    this._connectionMode.next(connectionMode);
  }

  private getAddressAsObservable(subject: Subject<string>): Observable<string> {
    return new Observable(fn => subject.subscribe(fn));
  }

  private getConnectionModeAsObservable(subject: Subject<string>): Observable<string> {
    return new Observable(fn => subject.subscribe(fn));
  }

  private getDeviceAsObservable(subject: Subject<Device>): Observable<Device> {
    return new Observable(fn => subject.subscribe(fn));
  }
}
