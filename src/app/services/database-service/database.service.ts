import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Dish } from "../../classes/dish";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  dishes!: Observable<any>;

  constructor(public db: AngularFireDatabase) {
    this.dishes = this.getDishes();
  }

  getDishes(): Observable<any> {
    return this.db.list('dishes').snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        let data = a.payload.val();
        // @ts-ignore
        let reviews = data.reviews;
        if (!reviews) {
          reviews = [];
        }
        // @ts-ignore
        let ratings = data.ratings;
        if (!ratings) {
          ratings = []
;        }
        // @ts-ignore
        return new Dish(a.payload.key, data.id, data.name, data.cuisine, data.type, data.category, data.ingredients, data.maxAmount, data.ordered, data.price, data.description, data.photos, data.rating, ratings, reviews);
      })
    }));
  }

  addDish(dish: Dish) {
    this.db.list('dishes').push(dish);
  }

  removeDish(dish: Dish) {
    this.db.list('dishes').remove(dish.key);
  }

  addRating(dish: Dish, star: number) {
    dish.ratings.push(star);
    dish.rating = Math.round(dish.ratings.reduce((a, b) => a + b) / dish.ratings.length);
    this.db.list('dishes').update(dish.key, {ratings: dish.ratings, rating: dish.rating});
  }

  addReview(dish: Dish) {
    this.db.list('dishes').update(dish.key, {reviews: dish.reviews});
  }

  orderDish(dish: Dish) {
    this.db.list('dishes').update(dish.key, {ordered: dish.ordered});
  }

  updateDish(dish: Dish) {
    this.db.list('dishes').update(dish.key, {name: dish.name, cuisine: dish.cuisine, type: dish.type,
      category: dish.category, ingredients: dish.ingredients, maxAmount: dish.maxAmount, price: dish.price,
      description: dish.description, photos: dish.photos})
  }
}
