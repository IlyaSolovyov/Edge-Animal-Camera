import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ConnectionStore } from 'src/app/shared/stores/connection.store';
import { DetectionService } from 'src/app/shared/services/detection.service';
import * as moment from 'moment';
import { ConnectionMode } from 'src/app/shared/models/connection-mode';
import { Encounter } from 'src/app/shared/models/encounter';
import { Detection } from 'src/app/shared/models/detection';

@Component({
  selector: 'camera-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent {
  periodForm: FormGroup;

  defaultStartDate: Date;
  defaultEndDate: Date;

  lastUsedStartDate: Date;
  lastUsedEndDate: Date;

  encounters: Encounter[] = [];

  constructor(private detectionService: DetectionService, private connectionStore: ConnectionStore, ) { }

  ngOnInit(): void {

    this.defaultStartDate = moment().subtract(1, 'days').set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toDate();
    this.defaultEndDate = moment().set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 999).toDate();

    this.periodForm = new FormGroup({
      startDateControl: new FormControl(this.defaultStartDate),
      endDateControl: new FormControl(this.defaultEndDate),
    });
  }

  fetch() {
    let startDate: Date = this.periodForm.get('startDateControl').value;
    let endDate: Date = this.periodForm.get('endDateControl').value;

    this.connectionStore.connectionMode.subscribe(mode => {
      if (mode == ConnectionMode.Connected) {
        this.connectionStore.address.subscribe(address => {
          this.detectionService.getEncountersDuringPeriod(address, startDate.toISOString(), endDate.toISOString()).subscribe(encounters => {
            let encounterEntities: Encounter[] = [];

            for (let i = 0; i < encounters.length; i++) {
              let detectionEntities: Detection[] = [];

              for (let j = 0; j < encounters[i].detections.length; j++) {
                let detection: Detection = new Detection(encounters[i].detections[j].id,
                  encounters[i].detections[j].detectedClass,
                  encounters[i].detections[j].quantity);
                detectionEntities.push(detection);
              }

              let encounter: Encounter = new Encounter(encounters[i].id, encounters[i].timestamp, detectionEntities);
              encounterEntities.push(encounter);
            }
        
            this.encounters = encounterEntities;

            this.lastUsedStartDate = startDate;
            this.lastUsedEndDate = endDate;
          });
        });
      } else if (mode == ConnectionMode.DemoMode) {  
        this.encounters = this.getDemoEncounters(moment(startDate).toDate(), moment(endDate).toDate());

        this.lastUsedStartDate = startDate;
        this.lastUsedEndDate = endDate;
      }
    });
  }

  saveAsJson() {
    let filename: string = moment(this.lastUsedStartDate).format("MMMM Do YYYY") +
      " - " +
      moment(this.lastUsedEndDate).format("MMMM Do YYYY");

    var a = document.createElement('a');
    a.setAttribute('href', 'data:application/json;charset=utf-u,' + encodeURIComponent(JSON.stringify(this.encounters)));
    a.setAttribute('download', filename);
    a.click();
  }

  getDemoEncounters(startDate: Date, endDate: Date): Encounter[] {
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
