import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CameraRoutingModule } from './camera-routing.module';
import { CameraComponent } from './components/camera/camera.component';

@NgModule({
  declarations: [
    CameraComponent
  ],
  imports: [
    BrowserModule,
    CameraRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class CameraModule { }
