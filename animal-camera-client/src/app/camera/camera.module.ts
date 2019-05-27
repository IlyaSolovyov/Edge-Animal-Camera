import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CameraRoutingModule } from './camera-routing.module';
import { CameraComponent } from './components/camera/camera.component';
import { ConnectComponent } from './components/connect/connect.component';
import { InformationComponent } from './components/information/information.component';
import { MaterialModule } from '../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DeviceComponent } from './components/device/device.component';

import { ActionsComponent } from './components/actions/actions.component';
import { RecentComponent } from './components/recent/recent.component';
import { EncounterListComponent } from './components/encounter-list/encounter-list.component';

@NgModule({
  declarations: [
    CameraComponent,
    ConnectComponent,
    InformationComponent,
    DeviceComponent,
    RecentComponent,
    ActionsComponent,
    EncounterListComponent
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
