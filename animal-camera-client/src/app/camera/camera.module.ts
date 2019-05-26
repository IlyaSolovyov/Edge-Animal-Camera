import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CameraRoutingModule } from './camera-routing.module';
import { CameraComponent } from './components/camera/camera.component';
import { ConnectComponent } from './components/connect/connect.component';
import { InformationComponent } from './components/information/information.component';

@NgModule({
  declarations: [
    CameraComponent,
    ConnectComponent,
    InformationComponent
  ],
  imports: [
    BrowserModule,
    CameraRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class CameraModule { }
