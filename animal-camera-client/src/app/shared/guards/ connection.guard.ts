import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from '../../../../node_modules/rxjs';
import { ConnectionStore } from '../stores/connection.store';
import { ConnectionMode } from '../models/connection-mode';



@Injectable()
export class ConnectionGuard implements CanActivate {

  constructor(private router: Router, private connectionStore: ConnectionStore) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.connectionStore.connectionMode.pipe(
      map((mode: string) => {
        if (mode != ConnectionMode.NotConnected) {
          return true;
        }

        console.log("Not connected: navigating to connection page.");
        this.router.navigate(['/camera/connect']);
        return false;
      })
    );
  }
}
