import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSliderModule } from "@angular-slider/ngx-slider";

import {AngularFireDatabase, AngularFireDatabaseModule} from "@angular/fire/compat/database";
import { AngularFireModule } from "@angular/fire/compat";
import { environment } from "../environments/environment";
import { AppRoutingModule } from './routing/app-routing.module';
import { AppComponent } from './app.component';
import { DishesListComponent } from './dishes-list/dishes-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddDishComponent } from './manager-view/add-dish/add-dish.component';
import { DishComponent } from './dishes-list/dish/dish.component';
import { FilterPipe } from './pipes/filter-pipe/filter.pipe';
import { FilterComponent } from './filter/filter.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DishPageComponent } from './dishes-list/dish-page/dish-page.component';
import { PageComponent } from './dishes-list/page/page.component';
import { DishReviewComponent } from './dishes-list/dish-review/dish-review.component';
import { LoginComponent } from './auth-pages/login/login.component';
import { SignupComponent } from './auth-pages/signup/signup.component';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { PersistenceComponent } from './admin-view/persistence/persistence.component';
import { UsersListComponent } from './admin-view/users-list/users-list.component';
import { ManagerViewComponent } from './manager-view/manager-view.component';
import { DishRecordComponent } from './manager-view/dish-record/dish-record.component';
import { EditDishComponent } from './manager-view/edit-dish/edit-dish.component';
import { EditDishFormComponent } from './manager-view/edit-dish-form/edit-dish-form.component';

@NgModule({
  declarations: [
    AppComponent,
    DishesListComponent,
    AddDishComponent,
    DishComponent,
    FilterPipe,
    FilterComponent,
    CartComponent,
    HomeComponent,
    MenuComponent,
    PageNotFoundComponent,
    DishPageComponent,
    PageComponent,
    DishReviewComponent,
    LoginComponent,
    SignupComponent,
    AdminViewComponent,
    PersistenceComponent,
    UsersListComponent,
    ManagerViewComponent,
    DishRecordComponent,
    EditDishComponent,
    EditDishFormComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        FormsModule,
        NgxSliderModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
