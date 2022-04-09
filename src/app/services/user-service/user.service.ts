import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { User } from "../../classes/user";
import {Observable, map} from "rxjs";
import {Dish} from "../../classes/dish";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users!: Observable<any>;
  currentUser!: Observable<User>;

  constructor(public db: AngularFireDatabase) {
    this.users = this.db.list('users').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        let data = a.payload.val();
        // @ts-ignore
        let history = data.history;
        if (!history) {
          history = [];
        }
        // @ts-ignore
        return new User(a.payload.key, data.nick, data.email, data.type, history, data.banned);
      })
    }));
  }

  addUser(user: User) {
    this.db.list('users').set(user.key, {nick: user.nick, email: user.email, type: user.type,
      history: user.history, banned: user.banned});
  }

  setUser(user: User) {
    this.db.list('users').update(user.key, {type: 0});
  }

  setManager(user: User) {
    this.db.list('users').update(user.key, {type: 1});
  }

  setAdmin(user: User) {
    this.db.list('users').update(user.key, {type: 2});
  }

  updateHistory(user: User) {
    this.db.list('users').update(user.key, {history: user.history});
  }

  switchBan(user: User, sentence: boolean) {
    this.db.list('users').update(user.key, {banned: sentence});
  }

  deleteDish(dish: Dish) {
    this.users.subscribe(e => {
      for (let user of e) {
        for (let entry of user.history) {
          if (entry.id == dish.id) {
            user.history.splice(user.history.indexOf(entry), 1);
          }
        }
      }
      for (let user of e) {
        this.updateHistory(user);
      }
    })
  }
}
