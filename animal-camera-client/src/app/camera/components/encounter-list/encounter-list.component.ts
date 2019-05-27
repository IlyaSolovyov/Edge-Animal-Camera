import { Component, Input, ViewChild, OnChanges, OnInit } from '@angular/core';
import { Encounter } from '../../../shared/models/encounter';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Detection } from '../../../shared/models/detection';

@Component({
  selector: 'camera-encounter-list',
  templateUrl: './encounter-list.component.html',
  styleUrls: ['./encounter-list.component.scss']
})
export class EncounterListComponent implements OnChanges, OnInit {
  @Input()
  encounters: Encounter[];

  @Input()
  displayPaginator: boolean;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  dataSource: MatTableDataSource<Encounter>;
  displayedColumns: string[] = ["id", "timestamp", "detected"];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.encounters);
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(): void {
    console.log("On changes event:");
    console.log(this.encounters);
    this.dataSource = new MatTableDataSource(this.encounters);
    this.dataSource.paginator = this.paginator;
  }

  getDetectionsString(detections: Detection[]): string {
    let detectionString: string = "";
    for (let i = 0; i < detections.length - 1; i++) {
      let singleDetection: string = "";
      singleDetection += detections[i].detectedClass;
      singleDetection += " (";
      singleDetection += detections[i].quantity;
      singleDetection += "), ";

      detectionString += singleDetection;
    }

    let lastDetection: string = "";
    lastDetection += detections[detections.length - 1].detectedClass;
    lastDetection += " (";
    lastDetection += detections[detections.length - 1].quantity;
    lastDetection += ")";

    detectionString += lastDetection;

    return detectionString;
  }
}
