import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ConnectionStore } from 'src/app/shared/stores/connection.store';
import { DetectionService } from 'src/app/shared/services/detection.service';
import * as moment from 'moment';

@Component({
  selector: 'camera-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent {
  periodForm: FormGroup;

  defaultStartDate: Date;
  defaultEndDate: Date; 
  constructor(private detectionService: DetectionService, private connectionStore: ConnectionStore, ) { }

  ngOnInit(): void {

    this.defaultStartDate = moment().subtract(1, 'days').toDate();
    this.defaultEndDate = moment().toDate();

    this.periodForm = new FormGroup({
      startDateControl: new FormControl(this.defaultStartDate),
      endDateControl: new FormControl(this.defaultEndDate),
    });
  }

  fetch() {
    let startDate: Date = this.periodForm.get('startDateControl').value;
    let endDate: Date = this.periodForm.get('endDateControl').value;

    console.log(startDate.toISOString());
    console.log(endDate.toISOString());
  }
}
