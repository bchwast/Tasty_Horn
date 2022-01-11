import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {map, Observable, of, switchMap, take} from 'rxjs';
import { AuthService } from "../services/auth-service/auth.service";
import {UserService} from "../services/user-service/user.service";

@Injectable({
  providedIn: 'root'
})
export class ManagerGuard implements CanActivate {
  constructor(public authService: AuthService, public userService: UserService, public router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.auth.authState.pipe(
      take(1),
      switchMap(user => {
        if (user != null) {
          return this.userService.db.object('users/' + user.uid).valueChanges().pipe(take(1))
        }
        else{
          this.router.navigate(['/home']);
          return of(null);
        }
      }), map(usr => {
        // @ts-ignore
        if (usr.type >= 1) {
          return true;
        }
        else {
          this.router.navigate(['/home']);
          return false;
        };
      })
    )
  }

}
