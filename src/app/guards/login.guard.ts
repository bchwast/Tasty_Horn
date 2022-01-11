import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {map, Observable, take} from 'rxjs';
import { AuthService } from "../services/auth-service/auth.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.auth.authState.pipe(take(1),map(user => {
      if (user != null) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    }))
  }

}
