import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as moment from 'moment';
import { ConnectionMode } from 'src/app/shared/models/connection-mode';
import { Detection } from 'src/app/shared/models/detection';
import { Encounter } from 'src/app/shared/models/encounter';
import { DemoService } from 'src/app/shared/services/demo.service';
import { DetectionService } from 'src/app/shared/services/detection.service';
import { ConnectionStore } from 'src/app/shared/stores/connection.store';

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

  fetchEverything: boolean = false;

  constructor(private detectionService: DetectionService, private connectionStore: ConnectionStore, private demoService: DemoService) { }

  ngOnInit(): void {

    this.defaultStartDate = moment().subtract(1, 'days').set('hour', 0).set('minute', 0).set('second', 0).set('millisecond', 0).toDate();
    this.defaultEndDate = moment().set('hour', 23).set('minute', 59).set('second', 59).set('millisecond', 999).toDate();

    this.periodForm = new FormGroup({
      startDateControl: new FormControl({ value: this.defaultStartDate, disabled: this.fetchEverything }),
      endDateControl: new FormControl({ value: this.defaultEndDate, disabled: this.fetchEverything })
    });
  }

  fetch() {
    let startDate: Date = this.periodForm.get('startDateControl').value;
    let endDate: Date = this.periodForm.get('endDateControl').value;

    this.connectionStore.connectionMode.subscribe(mode => {
      if (mode == ConnectionMode.Connected) {
        this.connectionStore.address.subscribe(address => {
          if (this.fetchEverything) {
            this.detectionService.getAllEncounters(address).subscribe(encounters => {
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
            });
          } else {
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
          }
        });
      } else if (mode == ConnectionMode.DemoMode) {
        if (this.fetchEverything) {
          this.encounters = this.demoService.getAllDemoEncounters();
        } else {
          this.encounters = this.demoService.getDemoEncountersDuringPeriod(moment(startDate).toDate(), moment(endDate).toDate());
        }

        this.lastUsedStartDate = startDate;
        this.lastUsedEndDate = endDate;
      }
    });
  }

  saveAsJson() {

    let filename: string;

    if (this.fetchEverything) {
      filename = moment().format("MMMM Do YYYY") + " (Complete log)";
    } else {
      filename = moment(this.lastUsedStartDate).format("MMMM Do YYYY") + " - " + moment(this.lastUsedEndDate).format("MMMM Do YYYY");
    }

    console.log("Saving encounter list as " + filename + ".json...");

    var a = document.createElement('a');
    a.setAttribute('href', 'data:application/json;charset=utf-u,' + encodeURIComponent(JSON.stringify(this.encounters)));
    a.setAttribute('download', filename);
    a.click();
  }

  toggleFetchMode() {
    this.fetchEverything = !this.fetchEverything;

    if (this.fetchEverything) {
      this.periodForm.get('startDateControl').disable();
      this.periodForm.get('endDateControl').disable();
    } else {
      this.periodForm.get('startDateControl').enable();
      this.periodForm.get('endDateControl').enable();
    }
  }

}
