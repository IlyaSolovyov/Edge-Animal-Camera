import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Device } from '../models/device';

@Injectable()
export class ConnectionStore {

  private _address: BehaviorSubject<string>;
  private _connected: BehaviorSubject<boolean>;
  private _device: BehaviorSubject<Device>;

  constructor() {
    this._address = new BehaviorSubject<string>(null);
    this._connected = new BehaviorSubject<boolean>(null);
    this._device = new BehaviorSubject<Device>(null);
  }

  get address(): Observable<string> {
    return this.getAddressAsObservable(this._address);
  }

  get connected(): Observable<boolean> {
    return this.getConnectionStatusAsObservable(this._connected);
  }

  get device(): Observable<Device> {
    return this.getDeviceAsObservable(this._device);
  }

  updateConnectionStatus(address: string, device:Device, status: boolean) {
    this._address.next(address);
    this._device.next(device);
    this._connected.next(status);
  }

  private getAddressAsObservable(subject: Subject<string>): Observable<string> {
    return new Observable(fn => subject.subscribe(fn));
  }

  private getConnectionStatusAsObservable(subject: Subject<boolean>): Observable<boolean> {
    return new Observable(fn => subject.subscribe(fn));
  }

  private getDeviceAsObservable(subject: Subject<Device>): Observable<Device> {
    return new Observable(fn => subject.subscribe(fn));
  }
}
