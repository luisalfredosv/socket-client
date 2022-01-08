import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  constructor(public wsServ: WebsocketService, private router: Router) {}

  canActivate(): boolean {
    if (this.wsServ.getUser()) {
      return true;
    } else {
      this.router.navigateByUrl('/');
      return false;
    }
  }
}
