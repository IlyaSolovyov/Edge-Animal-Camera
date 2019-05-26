import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { CameraModule } from '../camera/camera.module';
import { ConnectionService } from '../shared/services/connection.service';
import { ConnectionStore } from '../shared/stores/connection.store';
import { ConnectionGuard } from '../shared/guards/ connection.guard';
import { MaterialModule } from '../shared/modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

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
    CameraModule
  ],
  providers: [
    ConnectionService,
    ConnectionStore,
    ConnectionGuard,
    CookieService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
