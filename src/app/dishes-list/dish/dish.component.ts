import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Dish} from "../../classes/dish";
import {CartCurrencyService} from "../../services/cart-currency-service/cart-currency.service";
import {FilterService} from "../../services/filter-service/filter.service";
import {faTrash} from '@fortawesome/free-solid-svg-icons'
import {DatabaseService} from "../../services/database-service/database.service";
import {AuthService} from "../../services/auth-service/auth.service";

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
  faTrash = faTrash;
  stars = [1, 2, 3, 4, 5];
  @Input() dish!: Dish;

  constructor(public cartCurrencyService: CartCurrencyService, public dbService: DatabaseService,
              public filterService: FilterService, public authService: AuthService) {
  }

  ngOnInit(): void {
  }

  available(dish: Dish): number {
    return dish.maxAmount - dish.ordered;
  }

  canAddToCart(dish: Dish): boolean {
    return this.available(dish) > 0;
  }
}
