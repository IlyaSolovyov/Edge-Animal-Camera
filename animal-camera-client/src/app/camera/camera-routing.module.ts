import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CameraComponent } from './components/camera/camera.component';

const routes: Routes = [
  {path:'', redirectTo: 'camera', pathMatch: 'full'},
  {
    path: 'camera', component: CameraComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CameraRoutingModule { }
