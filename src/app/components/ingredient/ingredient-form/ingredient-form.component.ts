import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IngredientService} from "../../../services/ingredient/ingredient.service";
import {Ingredient} from "../../../models/ingredient/ingredient";
import {IngredientCategoryService} from "../../../services/ingredient-category/ingredient-category.service";
import {IngredientCategory} from "../../../models/ingredient-category/ingredient-category";
import {Observable} from "rxjs";
import { Router } from '@angular/router';
import {AllergenCategory} from "../../../models/allergen-category/allergen-category";
import {AllergenCategoryService} from "../../../services/allergen-category/allergen-category.service";

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
  styleUrls: ['./ingredient-form.component.css']
})
export class IngredientFormComponent implements OnInit {
  ingredientCategories!: Observable<IngredientCategory[]>;
  allergenCategories!: Observable<AllergenCategory[]>
  ingredientFormGroup!: FormGroup;
  manageAllergenCategory!: boolean;
  manageIngredientCategory!: boolean;

  constructor(
      private router : Router,
      private ingredientService: IngredientService,
      private ingredientCategoryService: IngredientCategoryService,
      private allergenCategoryService: AllergenCategoryService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.manageAllergenCategory = false;
    this.manageIngredientCategory = false;
    this.ingredientCategories = this.ingredientCategoryService.getAllIngredientCategories();
    this.allergenCategories = this.allergenCategoryService.getAllAllergenCategories();
    console.log(this.ingredientCategories);
    this.ingredientFormGroup = this.fb.group({
      name:[null, [Validators.required]],
      unitaryPrice:[null, [Validators.required]],
      unit:[null,[Validators.required]],
      stockQuantity:[null,[Validators.required]],
      ingredientCategory:[null,[Validators.required]],
      allergenCategory:[]});
  }

  manageAllergenCategoryAction() {
    //this.manageIngredientCategory = false;
    this.manageAllergenCategory = true;
  }

  manageIngredientCategoryAction() {
    //this.manageAllergenCategory = false;
    this.manageIngredientCategory = true;
  }

  createIngredient(){
    if(this.ingredientFormGroup.valid){
      let ingredient = new Ingredient(
          this.ingredientFormGroup.get("name")?.value,
          this.ingredientFormGroup.get("unitaryPrice")?.value,
          this.ingredientFormGroup.get("unit")?.value,
          this.ingredientFormGroup.get("stockQuantity")?.value,
          Number(this.ingredientFormGroup.get("ingredientCategory")?.value));
      if(this.ingredientFormGroup.get("allergenCategory")?.value != null){
        ingredient.allergenCategory = this.ingredientFormGroup.get("allergenCategory")?.value;
      }
      console.log(ingredient)
      this.ingredientService.createIngredient(ingredient).subscribe(ingredient => console.log("ingredient crée"));
      this.router.navigate(['ingredients']);
    }
  }

}
