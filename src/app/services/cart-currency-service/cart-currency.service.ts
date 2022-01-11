import {Injectable} from '@angular/core';
import {Dish} from "../../classes/dish";
import {Entry} from "../../classes/entry";
import {DatabaseService} from "../database-service/database.service";
import {AuthService} from "../auth-service/auth.service";
import {UserService} from "../user-service/user.service";
import {User} from "../../classes/user";

@Injectable({
  providedIn: 'root'
})

export class CartCurrencyService {
  currencies: { [key: string]: { value: number, symbol: string } } =
    {
      'eur': {value: 1, symbol: '€'},
      'usd': {value: 1.2, symbol: '$'}
    };
  currentCurrency = "eur"
  cart: Entry[] = [];
  dishes: Dish[] = []
  user!: User;
  guest = new User('amogus', 'guest', 'none', -1, [], false);
  ordersAmm!: number;

  constructor(public dbService: DatabaseService, public authService: AuthService, public userService: UserService) {
    this.dbService.dishes.subscribe(e => {
      this.dishes = e;
    })
    this.authService.userData.subscribe(user => {
      if (user != null) {
        this.userService.users.subscribe(e => {
          this.user = e.filter((usr: { key: string; }) => usr.key == user.uid)[0];
          this.getOrdersAmm();
        })
      }
      else {
        this.user = this.guest;
      }
    });
  }

  changeCurrency(curr: any) {
    this.currentCurrency = curr;
  }

  addToCart(dish: Dish) {
    if (this.user.type < 0) {
      return;
    }
    if (this.user.history.filter(entry => entry.id == dish.id).length > 0) {
      this.user.history.forEach(entry => {
        if (entry.id == dish.id) {
          entry.quantity++;
        }
      })
    } else {
      this.user.history.push({id: dish.id, name: dish.name, quantity: 1, rated: false, rating: 0});
    }
    dish.ordered++;
    this.getOrdersAmm();
    this.dbService.orderDish(dish);
    this.userService.updateHistory(this.user);
  }

  removeByID(id: number) {
    if (this.user.type < 0) {
      return;
    }
    let dish = this.dishes.filter(dish => dish.id == id)[0];
    this.removeFromCart(dish);
  }

  removeFromCart(dish: Dish) {
    if (this.user.type < 0) {
      return;
    }
    if (this.user.history.filter(entry => entry.id == dish.id).length > 0) {
      for (let entry of this.user.history) {
        if (entry.id == dish.id) {
          if (entry.quantity > 1) {
            entry.quantity--;
          }
          else {
            this.user.history.splice(this.user.history.indexOf(entry), 1);
          }
          dish.ordered--;
        }
      }
    }
    this.getOrdersAmm();
    this.dbService.orderDish(dish);
    this.userService.updateHistory(this.user);
  }

  getOrdersAmm() {
    let sum = 0;
    for (let entry of this.user.history) {
      sum += entry.quantity;
    }
    this.ordersAmm = sum;
  }

  getOrdersValue() {
    let sum = 0;
    for (let entry of this.user.history) {
      sum += entry.quantity * this.dishes.filter(dish => dish.id == entry.id).map(dish => dish.price)[0];
    }
    return sum;
  }

}
