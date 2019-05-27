import { Component, Input, ViewChild } from '@angular/core';
import { Device } from '../../../shared/models/device';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'camera-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent {
  @Input()
  device: Device;

  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  dataSource: MatTableDataSource<string>;
  displayedColumns: string[] = ["class"];

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.device.supportedClasses);
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
