import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Dish } from "../../classes/dish";
import {CartCurrencyService} from "../../services/cart-currency-service/cart-currency.service";
import {FilterService} from "../../services/filter-service/filter.service";
import {DatabaseService} from "../../services/database-service/database.service";
import {UserService} from "../../services/user-service/user.service";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-dish-record',
  templateUrl: './dish-record.component.html',
  styleUrls: ['./dish-record.component.css']
})
export class DishRecordComponent implements OnInit {
  @Input() dish!: Dish;
  @Output() deleteDishEvent = new EventEmitter<any>();
  stars = [1, 2, 3, 4, 5];
  faTrash = faTrash;

  constructor(public cartCurrencyService: CartCurrencyService, public filterService: FilterService,
              public dbService: DatabaseService, public userService: UserService) { }

  ngOnInit(): void {
  }

  available(dish: Dish): number {
    return dish.maxAmount - dish.ordered;
  }

  deleteDish() {
    this.userService.deleteDish(this.dish);
    this.dbService.removeDish(this.dish);
  }
}
