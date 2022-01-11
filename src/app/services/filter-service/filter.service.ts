import {Injectable} from '@angular/core';
import {Dish} from "../../classes/dish";
import {CartCurrencyService} from "../cart-currency-service/cart-currency.service";
import {FilterPipe} from "../../pipes/filter-pipe/filter.pipe";
import {DatabaseService} from "../database-service/database.service";

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  dishes: Dish[] = [];
  filterPipe = new FilterPipe();
  name: string = '';
  cuisines: any[] = [];
  categories: any[] = [];
  ratings: any[] = [];
  minPrice: number = 0;
  maxPrice: number = 0;

  constructor(public cartCurrencyService: CartCurrencyService,
              public dbService: DatabaseService) {
    this.dbService.dishes.subscribe(e => {
      this.dishes = e;
      this.minPrice = Math.floor(e.sort((dish1: { price: number; }, dish2: { price: number; }) => dish1.price - dish2.price)[0].price)
        * this.cartCurrencyService.currencies[this.cartCurrencyService.currentCurrency].value;
      this.maxPrice = Math.ceil(e.sort((dish1: { price: number; }, dish2: { price: number; }) => dish2.price - dish1.price)[0].price)
        * this.cartCurrencyService.currencies[this.cartCurrencyService.currentCurrency].value;
    })
  }

  getAllCuisines() {
    let cuisines = new Set();
    this.dishes.forEach(dish => cuisines.add(dish.cuisine));
    return Array.from(cuisines).sort();
  }

  getAllCategories() {
    let categories = new Set();
    this.dishes.forEach(dish => categories.add(dish.category));
    return Array.from(categories).sort();
  }

  getAllRatings() {
    let ratings = new Set();
    this.dishes.forEach(dish => ratings.add(dish.rating));
    return Array.from(ratings).sort();
  }

  cuisineSwitch(cuisine: any) {
    if (this.cuisines.includes(cuisine)) {
      this.cuisines.splice(this.cuisines.indexOf(cuisine), 1);
    } else {
      this.cuisines.push(cuisine);
    }
    this.cuisines = Object.assign([], this.cuisines);
    this.update();
  }

  categorySwitch(category: any) {
    if (this.categories.includes(category)) {
      this.categories.splice(this.categories.indexOf(category), 1);
    } else {
      this.categories.push(category);
    }
    this.categories = Object.assign([], this.categories);
    this.update();
  }

  ratingSwitch(rating: any) {
    if (this.ratings.includes(rating)) {
      this.ratings.splice(this.ratings.indexOf(rating), 1);
    } else {
      this.ratings.push(rating);
    }
    this.ratings = Object.assign([], this.ratings);
    this.update();
  }

  getMaxPrice() {
    if (this.categories.length == 0 && this.ratings.length == 0 && this.cuisines.length == 0) {
      return this.dishes.map(dish => dish.price).sort((a, b) => b - a)[0] *
        this.cartCurrencyService.currencies[this.cartCurrencyService.currentCurrency].value;
    }
    let ret = this.filterPipe.transform(this.dishes, '', this.cuisines, this.categories, this.ratings,
        0, 50, this.cartCurrencyService.currencies[this.cartCurrencyService.currentCurrency].value).map(dish => dish.price).sort((a, b) => b - a)[0] *
      this.cartCurrencyService.currencies[this.cartCurrencyService.currentCurrency].value;
    if (ret) {
      return ret;
    }
    return 0;
  }

  getMinPrice() {
    if (this.categories.length == 0 && this.ratings.length == 0 && this.cuisines.length == 0) {
      return this.dishes.map(dish => dish.price).sort((a, b) => a - b)[0] *
        this.cartCurrencyService.currencies[this.cartCurrencyService.currentCurrency].value;
    }
    let ret = this.filterPipe.transform(this.dishes, '', this.cuisines, this.categories, this.ratings,
        0, 50, this.cartCurrencyService.currencies[this.cartCurrencyService.currentCurrency].value).map(dish => dish.price).sort((a, b) => a - b)[0] *
      this.cartCurrencyService.currencies[this.cartCurrencyService.currentCurrency].value;
    if (ret) {
      return ret;
    }
    return 0;
  }

  update() {
    this.minPrice = Math.floor(this.getMinPrice());
    this.maxPrice = Math.ceil(this.getMaxPrice());
  }

  reset() {
    this.name = '';
    this.cuisines = [];
    this.categories = [];
    this.ratings = [];
    this.minPrice = Math.floor(this.getMinPrice());
    this.maxPrice = Math.ceil(this.getMaxPrice());
  }

}
