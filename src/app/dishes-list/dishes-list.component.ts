import {Component, OnInit} from '@angular/core';
import {Dish} from '../classes/dish'
import {FilterService} from "../services/filter-service/filter.service";
import {CartCurrencyService} from "../services/cart-currency-service/cart-currency.service";
import {DatabaseService} from "../services/database-service/database.service";
import {PaginationService} from "../services/pagination-service/pagination.service";

@Component({
  selector: 'app-dish-list',
  templateUrl: './dishes-list.component.html',
  styleUrls: ['./dishes-list.component.css']
})
export class DishesListComponent implements OnInit {

  constructor(public filterService: FilterService, public cartCurrencyService: CartCurrencyService,
              public dbService: DatabaseService, public paginationService: PaginationService) {
  }


  ngOnInit(): void {
  }

  available(dish: Dish): number {
    return dish.maxAmount - dish.ordered;
  }
}
