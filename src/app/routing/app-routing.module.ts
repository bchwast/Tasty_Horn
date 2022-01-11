import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "../home/home.component";
import {DishesListComponent} from "../dishes-list/dishes-list.component";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {CartComponent} from "../cart/cart.component";
import {DishPageComponent} from "../dishes-list/dish-page/dish-page.component";
import {LoginComponent} from "../auth-pages/login/login.component";
import {SignupComponent} from "../auth-pages/signup/signup.component";
import {LoginGuard} from "../guards/login.guard";
import {ManagerGuard} from "../guards/manager.guard";
import {GuestGuard} from "../guards/guest.guard";
import {AdminViewComponent} from "../admin-view/admin-view.component";
import {AdminGuard} from "../guards/admin.guard";
import {ManagerViewComponent} from "../manager-view/manager-view.component";
import {AddDishComponent} from "../manager-view/add-dish/add-dish.component";
import {EditDishComponent} from "../manager-view/edit-dish/edit-dish.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'dishes', component: DishesListComponent},
  {path: 'admin', component: AdminViewComponent, canActivate: [LoginGuard, AdminGuard]},
  {path: 'manager', component: ManagerViewComponent, canActivate: [LoginGuard, ManagerGuard]},
  {path: 'add', component: AddDishComponent, canActivate: [LoginGuard, ManagerGuard]},
  {path: 'cart', component: CartComponent, canActivate: [LoginGuard]},
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  {path: 'signup', component: SignupComponent, canActivate: [GuestGuard]},
  {path: 'dish/:id', component: DishPageComponent, canActivate: [LoginGuard]},
  {path: 'edit/:id', component: EditDishComponent, canActivate: [LoginGuard, ManagerGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
