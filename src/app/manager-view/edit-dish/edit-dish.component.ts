import { Component, OnInit } from '@angular/core';
import {faChevronLeft, faChevronRight, faTrash} from "@fortawesome/free-solid-svg-icons";
import {DatabaseService} from "../../services/database-service/database.service";
import {ActivatedRoute} from "@angular/router";
import {CartCurrencyService} from "../../services/cart-currency-service/cart-currency.service";

@Component({
  selector: 'app-edit-dish',
  templateUrl: './edit-dish.component.html',
  styleUrls: ['./edit-dish.component.css']
})
export class EditDishComponent implements OnInit {
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faTrash = faTrash;
  dish: any;
  photo = 0;

  constructor(public dbService: DatabaseService, public route: ActivatedRoute,
              public cartCurrencyService: CartCurrencyService) { }

  ngOnInit(): void {
    this.dbService.dishes.subscribe(e => {
      this.route.paramMap.subscribe(parameters => {
        this.dish = e.filter((dish: { id: string | null; }) => dish.id == parameters.get('id'))[0];
      })
    })
  }

  prevPhoto() {
    this.photo == 0 ? this.photo = this.dish.photos.length - 1 : this.photo--;
  }

  nextPhoto() {
    this.photo == this.dish.photos.length - 1 ? this.photo = 0 : this.photo++;
  }

  removeIngredient(ingredient: string) {
    if (this.dish.ingredients.length > 1) {
      this.dish.ingredients.splice(this.dish.ingredients.indexOf(ingredient), 1);
      this.dbService.updateDish(this.dish);
    }
  }

  removePhoto(photo: string) {
    if (this.dish.photos.length > 1) {
      this.dish.photos.splice(this.dish.photos.indexOf(photo), 1);
      this.dbService.updateDish(this.dish);
    }
  }
}
