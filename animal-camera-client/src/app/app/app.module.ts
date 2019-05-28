import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { CameraModule } from '../camera/camera.module';
import { ConnectionGuard } from '../shared/guards/ connection.guard';
import { MaterialModule } from '../shared/modules/material.module';
import { ConnectionService } from '../shared/services/connection.service';
import { DetectionService } from '../shared/services/detection.service';
import { ConnectionStore } from '../shared/stores/connection.store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { MatMomentDateModule } from "@angular/material-moment-adapter";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule,
    CameraModule,
    MatMomentDateModule
  ],
  providers: [
    ConnectionService,
    DetectionService,
    ConnectionStore,
    ConnectionGuard,
    CookieService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
