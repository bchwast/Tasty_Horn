import {Component, Input, OnInit} from '@angular/core';
import { Dish } from "../../classes/dish";
import {FormBuilder, Validators, FormControl, FormArray} from "@angular/forms";
import {FilterService} from "../../services/filter-service/filter.service";
import {DatabaseService} from "../../services/database-service/database.service";

@Component({
  selector: 'app-edit-dish-form',
  templateUrl: './edit-dish-form.component.html',
  styleUrls: ['./edit-dish-form.component.css']
})
export class EditDishFormComponent implements OnInit {
  @Input() dish!: Dish;
  edit = this.fb.group({
    name: ['', [Validators.pattern('[a-zA-Z ]*'), this.duplicateNameValidator.bind(this)]],
    cuisine: ['', [Validators.pattern('[a-zA-Z ]*')]],
    type: ['', [Validators.pattern('[a-zA-Z ]*')]],
    category: ['', [Validators.pattern('[a-zA-Z ]*')]],
    ingredients: this.fb.array([this.fb.control('')]),
    maxAmount: [0, [Validators.min(0)]],
    price: [0, [Validators.min(0), Validators.max(50)]],
    description: [''],
    photos: this.fb.array([this.fb.control('')])
  })

  constructor(public fb: FormBuilder, public filterService: FilterService, public dbService: DatabaseService) { }

  ngOnInit(): void {
  }

  duplicateNameValidator(control: FormControl) {
    let name = control.value;
    if (name && this.filterService.dishes.map(dish => dish.name).includes(name)) {
      return {
        duplicateName : {
          name: name
        }
      };
    }
    return null;
  }

  get ingredients() {
    return this.edit.get('ingredients') as FormArray;
  }

  get photos() {
    return this.edit.get('photos') as FormArray;
  }

  addIngredient() {
    this.ingredients.push(this.fb.control(''));
  }

  addPhoto() {
    this.photos.push(this.fb.control(''));
  }

  updateDish(edit: any) {
    console.log(edit.ingredients);
    console.log(edit.photos);
    this.dish.name = edit.name != null && edit.name != '' ? edit.name : this.dish.name;
    this.dish.cuisine = edit.cuisine != null && edit.cuisine != '' ? edit.cuisine: this.dish.cuisine;
    this.dish.type = edit.type != null && edit.type != '' ? edit.type : this.dish.type
    this.dish.category = edit.category != null && edit.category != '' ? edit.category : this.dish.category;
    this.dish.maxAmount = edit.maxAmount > 0 ? edit.maxAmount : this.dish.maxAmount;
    this.dish.price = edit.price > 0 ? edit.price : this.dish.price;
    this.dish.description = edit.description != null && edit.description != '' ? edit.description : this.dish.description;
    if (edit.ingredients.length > 0) {
      for (let ingredient of edit.ingredients) {
        if (ingredient == null || ingredient == '') {
          edit.ingredients.splice(edit.ingredients.indexOf(ingredient), 1);
        }
      }
      this.dish.ingredients.push(...edit.ingredients);
    }
    if (edit.photos.length > 0) {
      for (let photo of edit.photos) {
        if (photo == null || photo == '') {
          edit.photos.splice(edit.photos.indexOf(photo), 1);
        }
      }
      this.dish.photos.push(...edit.photos);
    }
    this.dbService.updateDish(this.dish);
  }

  onSubmit() {
    this.updateDish(this.edit.value);
    this.edit.reset();
    this.filterService.update();
  }
}
