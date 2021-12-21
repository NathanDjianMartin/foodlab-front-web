import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IngredientService} from "../../../services/ingredient/ingredient.service";
import {Ingredient} from "../../../models/ingredient/ingredient";
import {IngredientCategoryService} from "../../../services/ingredient-category/ingredient-category.service";
import {IngredientCategory} from "../../../models/ingredient-category/ingredient-category";
import {Observable} from "rxjs";

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css']
})
export class IngredientFormComponent implements OnInit {
  ingredientCategories!: Observable<IngredientCategory[]>;
  ingredientFormGroup!: FormGroup;

  constructor(
      private ingredientService: IngredientService,
      private ingredientCategoryService: IngredientCategoryService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.ingredientCategories = this.ingredientCategoryService.getAllIngredientCategories();
    console.log(this.ingredientCategories);
    this.ingredientFormGroup = this.fb.group({
      name:[null, [Validators.required]],
      unitaryPrice:[null, [Validators.required]],
      unit:[null,[Validators.required]],
      stockQuantity:[null,[Validators.required]],
      ingredientCategory:[null,[Validators.required]]});
  }

  createIngredient(){
    if(this.ingredientFormGroup.valid){
      let ingredient = new Ingredient(
          this.ingredientFormGroup.get("name")?.value,
          this.ingredientFormGroup.get("unitaryPrice")?.value,
          this.ingredientFormGroup.get("unit")?.value,
          this.ingredientFormGroup.get("ingredientCategory")?.value,
          this.ingredientFormGroup.get("stockQuantity")?.value);
      this.ingredientService.createIngredient(ingredient).subscribe(ingredient => console.log("ingredient crée"));
    }
  }

}
