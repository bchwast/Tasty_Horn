import { Injectable } from '@angular/core';
import { FilterService } from "../filter-service/filter.service";
import { FilterPipe } from "../../pipes/filter-pipe/filter.pipe";
import { CartCurrencyService } from "../cart-currency-service/cart-currency.service";
import { Dish } from "../../classes/dish";
import { DatabaseService } from "../database-service/database.service";

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  filterPipe = new FilterPipe;
  currentPage = 1;
  itemsPerPage = 9;
  showableDishes: Dish[] = []

  constructor(public filterService: FilterService, public cartCurrencyService: CartCurrencyService,
              public dbService: DatabaseService) {
    this.setItemsPerPage(9);
  }

  update() {
    this.dbService.dishes.subscribe(e => {
      this.showableDishes = this.filterPipe.transform(e, '', this.filterService.cuisines, this.filterService.categories,
        this.filterService.ratings, this.filterService.minPrice, this.filterService.maxPrice,
        this.cartCurrencyService.currencies[this.cartCurrencyService.currentCurrency].value)
    })
  }

  setItemsPerPage(amm: number) {
    this.itemsPerPage = amm;
    this.firstPage();
    this.update();
  }

  nextPage() {
    this.currentPage = Math.min(this.currentPage + 1, this.getMaxPage())
  }

  prevPage() {
    this.currentPage = Math.max(this.currentPage - 1, 1);
  }

  firstPage() {
    this.currentPage = 1;
  }

  lastPage() {
    this.currentPage = this.getMaxPage();
  }

  getMaxPage() {
    return Math.ceil(this.showableDishes.length / this.itemsPerPage);
  }
}
