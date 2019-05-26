import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { CameraModule } from '../camera/camera.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    CameraModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
