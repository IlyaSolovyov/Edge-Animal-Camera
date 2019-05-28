import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material.module';
import { CameraRoutingModule } from './camera-routing.module';
import { ActionsComponent } from './components/actions/actions.component';
import { CameraComponent } from './components/camera/camera.component';
import { ConnectComponent } from './components/connect/connect.component';
import { DeviceComponent } from './components/device/device.component';
import { EncounterListComponent } from './components/encounter-list/encounter-list.component';
import { InformationComponent } from './components/information/information.component';
import { PeriodComponent } from './components/period/period.component';
import { RecentComponent } from './components/recent/recent.component';
import { TestComponent } from './components/test/test.component';


@NgModule({
  declarations: [
    CameraComponent,
    ConnectComponent,
    InformationComponent,
    DeviceComponent,
    RecentComponent,
    ActionsComponent,
    EncounterListComponent,
    PeriodComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    CameraRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class CameraModule { }
