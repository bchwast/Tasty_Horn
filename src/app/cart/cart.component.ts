import { Component, OnInit } from '@angular/core';
import { CartCurrencyService } from "../services/cart-currency-service/cart-currency.service";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  faTrash = faTrash;

  constructor(public cartCurrencyService: CartCurrencyService) { }

  ngOnInit(): void {
  }

}
