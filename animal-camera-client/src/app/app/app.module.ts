import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { CameraModule } from '../camera/camera.module';
import { ConnectionService } from '../shared/services/connection.service';
import { ConnectionStore } from '../shared/stores/connection.store';
import { ConnectionGuard } from '../shared/guards/ connection.guard';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    CameraModule
  ],
  providers: [
    ConnectionService,
    ConnectionStore,
    ConnectionGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
