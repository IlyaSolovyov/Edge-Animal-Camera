import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Encounter } from '../models/encounter';

@Injectable()
export class DetectionService {

  constructor(protected http: HttpClient) { }

  getRecentEncounters(address: string): Observable<Encounter[]> {
    return this.http.get<Encounter[]>('http://' + address + '/encounters/recent');
  }

  getEncountersDuringPeriod(address:string, startDateIso: string, endDateIso:string): Observable<Encounter[]> {
    return this.http.get<Encounter[]>('http://' + address + '/encounters/' + startDateIso + "/" + endDateIso);
  }

  getAllEncounters(address: string): Observable<Encounter[]> {
    return this.http.get<Encounter[]>('http://' + address + '/encounters/');
  }
}
