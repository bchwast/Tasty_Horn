import { Component, OnInit } from '@angular/core';
import { Dish } from "../classes/dish";
import { DatabaseService } from "../services/database-service/database.service";
import { FilterService } from "../services/filter-service/filter.service";
import { PaginationService } from "../services/pagination-service/pagination.service";
import { CartCurrencyService } from "../services/cart-currency-service/cart-currency.service";

@Component({
  selector: 'app-manager-view',
  templateUrl: './manager-view.component.html',
  styleUrls: ['./manager-view.component.css']
})
export class ManagerViewComponent implements OnInit {

  constructor(public filterService: FilterService, public dbService: DatabaseService,
              public paginationService: PaginationService, public cartCurrencyService: CartCurrencyService) { }

  ngOnInit(): void {
  }

}
