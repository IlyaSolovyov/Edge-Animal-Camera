import { Component, Input, ViewChild } from '@angular/core';
import { Encounter } from '../../../shared/models/encounter';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Detection } from '../../../shared/models/detection';

@Component({
  selector: 'camera-encounter-list',
  templateUrl: './encounter-list.component.html',
  styleUrls: ['./encounter-list.component.scss']
})
export class EncounterListComponent {
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

  getDetectionsString(detections: Detection[]): string {
    return "";
  }
}
