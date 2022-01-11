import {Component, Input, OnInit} from '@angular/core';
import {Dish} from "../../classes/dish";
import {FormBuilder, Validators} from "@angular/forms";
import {DatabaseService} from "../../services/database-service/database.service";
import {User} from "../../classes/user";

@Component({
  selector: 'app-dish-review',
  templateUrl: './dish-review.component.html',
  styleUrls: ['./dish-review.component.css']
})
export class DishReviewComponent implements OnInit {
  @Input() dish!: Dish;
  @Input() user!: User;
  alert = 0;
  review = this.fb.group({
    name: ['', [Validators.required]],
    text: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
    date: ['']
  })

  constructor(public fb: FormBuilder, public dbService: DatabaseService) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.user.banned) {
      this.alert = 1;
      return;
    }
    let tEntry = this.user.history.filter(entry => entry.id == this.dish.id);
    if (tEntry.length == 0) {
      this.alert = 2;
      return;
    }
    this.alert = 0;
    this.dish.reviews.push({nick: this.user.nick, name: this.review.value.name,
      body: this.review.value.text, date: this.review.value.date});
    this.review.reset();
    this.dbService.addReview(this.dish);
  }
}
