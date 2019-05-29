import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { Device } from '../models/device';
import { Encounter } from '../models/encounter';
import { Detection } from '../models/detection';

@Injectable()
export class DemoService {

  constructor() { }

  getAllDemoEncounters(): Encounter[] {
    let testDetection1: Detection = new Detection(1, "Test Class 1", 1);
    let testDetection2: Detection = new Detection(2, "Test Class 2", 3);
    let testDetection3: Detection = new Detection(3, "Test Class 1", 2);
    let testDetection4: Detection = new Detection(4, "Test Class 2", 2);
    let testDetection5: Detection = new Detection(5, "Test Class 1", 3);
    let testDetection6: Detection = new Detection(6, "Test Class 2", 1);
    let testDetection7: Detection = new Detection(7, "Test Class 1", 3);

    let testEncounter1: Encounter = new Encounter(1, new Date(), [testDetection1, testDetection2]);
    let testEncounter2: Encounter = new Encounter(2, new Date(), [testDetection3, testDetection4]);
    let testEncounter3: Encounter = new Encounter(3, new Date(), [testDetection5]);
    let testEncounter4: Encounter = new Encounter(4, new Date(), [testDetection6]);
    let testEncounter5: Encounter = new Encounter(5, new Date(), [testDetection7]);

    return [testEncounter1, testEncounter2, testEncounter3, testEncounter4, testEncounter5];
  }

  getRecentDemoEncounters(): Encounter[] {
    let testDetection1: Detection = new Detection(1, "Test Class 1", 1);
    let testDetection2: Detection = new Detection(2, "Test Class 2", 3);
    let testDetection3: Detection = new Detection(3, "Test Class 1", 2);
    let testDetection4: Detection = new Detection(4, "Test Class 2", 2);
    let testDetection5: Detection = new Detection(5, "Test Class 1", 3);
    let testDetection6: Detection = new Detection(6, "Test Class 2", 1);
    let testDetection7: Detection = new Detection(7, "Test Class 1", 3);

    let testEncounter1: Encounter = new Encounter(1, new Date(), [testDetection1, testDetection2]);
    let testEncounter2: Encounter = new Encounter(2, new Date(), [testDetection3, testDetection4]);
    let testEncounter3: Encounter = new Encounter(3, new Date(), [testDetection5]);
    let testEncounter4: Encounter = new Encounter(4, new Date(), [testDetection6]);
    let testEncounter5: Encounter = new Encounter(5, new Date(), [testDetection7]);

    return [testEncounter1, testEncounter2, testEncounter3, testEncounter4, testEncounter5];
  }

  getDemoEncountersDuringPeriod(startDate: Date, endDate: Date): Encounter[] {
    let testDetection1: Detection = new Detection(1, "Test Class 1", Math.floor(Math.random() * 3) + 1);
    let testDetection2: Detection = new Detection(2, "Test Class 2", Math.floor(Math.random() * 3) + 1);
    let testDetection3: Detection = new Detection(3, "Test Class 1", Math.floor(Math.random() * 3) + 1);
    let testDetection4: Detection = new Detection(4, "Test Class 2", Math.floor(Math.random() * 3) + 1);
    let testDetection5: Detection = new Detection(5, "Test Class " + (Math.floor(Math.random() * 2) + 1), Math.floor(Math.random() * 3) + 1);
    let testDetection6: Detection = new Detection(6, "Test Class " + (Math.floor(Math.random() * 2) + 1), Math.floor(Math.random() * 3) + 1);
    let testDetection7: Detection = new Detection(7, "Test Class " + (Math.floor(Math.random() * 2) + 1), Math.floor(Math.random() * 3) + 1);

    let testEncounter1: Encounter = new Encounter(1, this.getRandomDate(startDate, endDate), [testDetection1, testDetection2]);
    let testEncounter2: Encounter = new Encounter(2, this.getRandomDate(testEncounter1.timestamp, endDate), [testDetection3, testDetection4]);
    let testEncounter3: Encounter = new Encounter(3, this.getRandomDate(testEncounter2.timestamp, endDate), [testDetection5]);
    let testEncounter4: Encounter = new Encounter(4, this.getRandomDate(testEncounter3.timestamp, endDate), [testDetection6]);
    let testEncounter5: Encounter = new Encounter(5, this.getRandomDate(testEncounter4.timestamp, endDate), [testDetection7]);

    return [testEncounter1, testEncounter2, testEncounter3, testEncounter4, testEncounter5];
  }

  getRandomDate(startDate: Date, endDate: Date) {
    console.log("get random");
    console.log(startDate);
    console.log(endDate);
    var date = new Date(+startDate + Math.random() * (endDate - startDate));
    var hour = startDate.getHours() + Math.random() * (endDate.getHours() - startDate.getHours()) | 0;
    date.setHours(hour);
    return date;
  }
}
