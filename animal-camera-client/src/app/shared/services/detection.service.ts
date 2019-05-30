import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Encounter } from '../models/encounter';
import { Detection } from '../models/detection';

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
    return this.http.get<Encounter[]>('http://' + address + '/encounters');
  }

  runTestDetection(address: string, imageBase64: string): Observable<Encounter> {
    const formData: FormData = new FormData();
    formData.append('imageBase64', imageBase64);
    return this.http.post<Encounter>('http://' + address + '/detection', formData);
  }
}
