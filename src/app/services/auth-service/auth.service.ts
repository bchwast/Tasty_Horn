import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { UserService } from "../user-service/user.service";
import { Router } from "@angular/router";
import firebase from "firebase/compat/app";
import {Observable} from "rxjs";
import {User} from "../../classes/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData!: Observable<any>;

  constructor(public auth: AngularFireAuth, public userService: UserService, public router: Router) {
    this.userData = auth.authState;
  }

  signUp(nick: string, email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(['home']);
        let user = new User(res.user!.uid, nick, email, 0,  [],  false);
        this.userService.addUser(user);
      })
      .catch(error => {
        alert('Something went wrong with sign up ' + error);
      })
  }

  logIn(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['home']);
      })
      .catch(error => {
        alert('Something went wrong with log in ' + error);
      })
  }

  logOut() {
    this.auth.signOut().then(() => {
    })
      .catch(error => {
        alert('Something went wrong with sing ouy ' + error);
      })
  }

  setPersistence(type: string) {
    let accepted = ['local', 'session', 'none'];
    if (!accepted.includes(type)) {
      return;
    }
    switch (type) {
      case 'local':
        return this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      case 'session':
        return this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
      case 'none':
        return this.auth.setPersistence(firebase.auth.Auth.Persistence.NONE);
      default:
        return;
    }
  }
}
