import { Component, OnInit } from '@angular/core';
import {Dish} from "../../classes/dish";
import {CartCurrencyService} from "../../services/cart-currency-service/cart-currency.service";
import {DatabaseService} from "../../services/database-service/database.service";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {ActivatedRoute} from "@angular/router";
import { FilterService } from "../../services/filter-service/filter.service";
import {UserService} from "../../services/user-service/user.service";
import {User} from "../../classes/user";
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-dish-page',
  templateUrl: './dish-page.component.html',
  styleUrls: ['./dish-page.component.css']
})
export class DishPageComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  dish: any;
  photo = 0;
  stars = [1, 2, 3, 4, 5];
  rated = false;
  rating = 0;
  user!: User;
  alert = 0;


  constructor(public cartCurrencyService: CartCurrencyService, public dbService: DatabaseService,
              public route: ActivatedRoute, public filterService: FilterService,
              public userService: UserService, public authService: AuthService) { }

  ngOnInit(): void {
    this.dbService.dishes.subscribe(e => {
      this.route.paramMap.subscribe(parameters => {
        this.dish = e.filter((dish: { id: string | null; }) => dish.id == parameters.get('id'))[0];
      })
    })
    this.authService.userData.subscribe(user => {
      if (user != null) {
        this.userService.users.subscribe(e => {
          this.user = e.filter((usr: { key: string; }) => usr.key == user.uid)[0];
          for (let entry of this.user.history) {
            if (entry.id == this.dish.id) {
              this.rated = entry.rated;
              this.rating = entry.rating;
            }
          }
        })
      }
    });
  }

  prevPhoto() {
    this.photo == 0 ? this.photo = this.dish.photos.length - 1 : this.photo--;
  }

  nextPhoto() {
    this.photo == this.dish.photos.length - 1 ? this.photo = 0 : this.photo++;
  }

  available(dish: Dish): number {
    return dish.maxAmount - dish.ordered;
  }

  canAddToCart(dish: Dish): boolean {
    return this.available(dish) > 0;
  }

  addRating(dish:Dish, star: number) {
    if (this.user.type == 1) {
      this.alert = 1
      return;
    }
    if (this.user.banned) {
      this.alert = 2
      return;
    }
    let tEntry = this.user.history.filter(entry => entry.id == dish.id);
    if (tEntry.length == 0) {
      this.alert = 3;
      return;
    }
    if (tEntry[0].rated) {
      this.alert = 4;
      return;
    }
    else {
      this.alert = 0;
      this.dbService.addRating(this.dish, star);
      for (let entry of this.user.history) {
        if (entry.id == dish.id) {
          entry.rated = true;
          entry.rating = star;
          this.rating = star;
          this.userService.updateHistory(this.user);
        }
      }
    }
  }
}
