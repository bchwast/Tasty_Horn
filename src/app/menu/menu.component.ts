import {Component, HostListener, OnInit} from '@angular/core';
import {CartCurrencyService} from "../services/cart-currency-service/cart-currency.service";
import {FilterService} from "../services/filter-service/filter.service";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {AuthService} from "../services/auth-service/auth.service";
import {User} from "../classes/user";
import {UserService} from "../services/user-service/user.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  faCart = faShoppingCart;
  visible = false;
  width: any;
  guest = new User('amogus', 'guest', 'none', -1, [], false);
  user!: User;

  constructor(public cartCurrencyService: CartCurrencyService, public filterService: FilterService,
              public authService: AuthService, public userService: UserService) { }

  ngOnInit(): void {
    this.width = window.innerWidth;
    this.authService.userData.subscribe(user => {
      if (user != null) {
        this.userService.users.subscribe(e => {
          this.user = e.filter((usr: { key: string; }) => usr.key == user.uid)[0];
        })
      }
      else {
        this.user = this.guest;
      }
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.width = window.innerWidth;
  }

  menuToggle() {
    this.visible = !this.visible;
  }

}
