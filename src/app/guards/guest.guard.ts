import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {map, Observable} from 'rxjs';
import { AuthService } from "../services/auth-service/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.auth.authState.pipe(map(user => {
      if (user != null) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }))
  }

}
