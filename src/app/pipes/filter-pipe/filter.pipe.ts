import {Pipe, PipeTransform} from '@angular/core';
import {Dish} from "../../classes/dish";

@Pipe({
  name: 'filterDishes',
})
export class FilterPipe implements PipeTransform {

  transform(dishes: Dish[], name: string, cuisine: string[], category: string[], rating: number[], minPrice: number, maxPrice: number, currency: number): Dish[] {
    let output = dishes;
    if (dishes && name) {
      name = name.toLowerCase();
      output = output.filter(dish => dish.name.toLowerCase().includes(name));
    }
    if (output && cuisine.length > 0) {
      let current = [];
      for (let el of cuisine) {
        el = el.toLowerCase();
        current.push(...output.filter(dish => dish.cuisine.toLowerCase().includes(el)));
      }
      output = current;
    }
    if (output && category.length > 0) {
      let current = [];
      for (let el of category) {
        el = el.toLowerCase();
        current.push(...output.filter(dish => dish.category.toLowerCase().includes(el)));
      }
      output = current;
    }
    if (output && rating.length > 0) {
      let current = [];
      for (let el of rating) {
        current.push(...output.filter(dish => dish.rating == el));
      }
      output = current;
    }
    if (output && minPrice >= 0 && maxPrice >= 0) {
      output = output.filter(dish => minPrice <= Number((dish.price * currency).toFixed(2)) &&
        Number((dish.price).toFixed(2)) * currency <= maxPrice)
    }
    output.sort((a, b) => a.name.localeCompare(b.name))
    return output;
  }
}
