import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Encounter } from '../models/encounter';

@Injectable()
export class DetectionService {

  constructor(protected http: HttpClient) { }

  getRecentEncounters(): Observable<Encounter> {
    return of([]);
  }
}
