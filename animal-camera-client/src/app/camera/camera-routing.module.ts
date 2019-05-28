import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CameraComponent } from './components/camera/camera.component';
import { InformationComponent } from './components/information/information.component';
import { ConnectComponent } from './components/connect/connect.component';
import { ConnectionGuard } from '../shared/guards/ connection.guard';
import { PeriodComponent } from './components/period/period.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [

  {
    path: 'camera', component: CameraComponent, children:
      [
        { path: '', redirectTo: 'info', pathMatch: 'full' },
        //{ path: 'info', component: InformationComponent, canActivate: [ConnectionGuard] },    
        { path: 'connect', component: ConnectComponent },
        {
          path: 'info', component: InformationComponent, children:
            [
              { path: '', component: PeriodComponent },
              { path: 'test', component: TestComponent}
            ]
        },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CameraRoutingModule { }
