import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IngredientService} from "../../../services/ingredient/ingredient.service";
import {Ingredient} from "../../../models/ingredient/ingredient";
import {IngredientCategoryService} from "../../../services/ingredient-category/ingredient-category.service";
import {IngredientCategory} from "../../../models/ingredient-category/ingredient-category";
import {Observable} from "rxjs";
import {ActivatedRoute, Router} from '@angular/router';
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
  manageAllergenCategory: boolean = false;
  manageIngredientCategory: boolean = false;
  ingredientId?: number | undefined;

  constructor(
      private router : Router,
      private route: ActivatedRoute,
      private ingredientService: IngredientService,
      private ingredientCategoryService: IngredientCategoryService,
      private allergenCategoryService: AllergenCategoryService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.ingredientCategories = this.ingredientCategoryService.getAllIngredientCategories();
    this.allergenCategories = this.allergenCategoryService.getAllAllergenCategories();

    const paramIngredientId: string | null = this.route.snapshot.paramMap.get('id');
    this.ingredientId = paramIngredientId !== null ? parseInt(paramIngredientId) : undefined;

    this.initIngredientForm();
  }

  initIngredientForm() : void {
    let name = null;
    let unitaryPrice = null;
    let unit = null;
    let stockQuantity = null;
    let ingredientCategory = null;
    let allergenCategory = null;

    // retrieves the ingredient if there is an "id" param and it corresponds to an ingredient in the database
    if (this.ingredientId !== undefined) {
      let ingredient: Ingredient;
      this.ingredientService.getOne(this.ingredientId).subscribe({
        next: (data) => {
          ingredient = JSON.parse(JSON.stringify(data));
          name = ingredient.name;
          unitaryPrice = ingredient.unitaryPrice;
          unit = ingredient.unit;
          stockQuantity = ingredient.stockQuantity;

          this.ingredientFormGroup = this.fb.group({
            name: [name, [Validators.required]],
            unitaryPrice: [unitaryPrice, [Validators.required]],
            unit: [unit, [Validators.required]],
            stockQuantity: [stockQuantity, [Validators.required]],
            ingredientCategory: [null, [Validators.required]],
            allergenCategory: [null]
          });

          this.ingredientCategories.subscribe({
            next: (data) => {
              const ingredientCategoryId = ingredient.ingredientCategoryId;
              this.ingredientFormGroup.controls['ingredientCategory'].setValue(ingredientCategoryId);
            }
          })

          this.allergenCategories.subscribe({
            next: (data) => {
              const allergenCategoryId = ingredient.allergenCategoryId;
              if (allergenCategoryId !== null) {
                this.ingredientFormGroup.controls['allergenCategory'].setValue(allergenCategoryId);
              }
            }
          })
        },
        error: (err) => {
          alert(`Error while initializing the ingredient form: ${err.message}`)
        }
      })
    }

    this.ingredientFormGroup = this.fb.group({
      name:[name, [Validators.required]],
      unitaryPrice:[unitaryPrice, [Validators.required]],
      unit:[unit,[Validators.required]],
      stockQuantity:[stockQuantity,[Validators.required]],
      ingredientCategory:[ingredientCategory,[Validators.required]],
      allergenCategory:[allergenCategory]});
  }

  toggleAllergenCategoryManagement() {
    this.manageAllergenCategory = !this.manageAllergenCategory;
  }

  toggleIngredientCategoryManagement() {
    this.manageIngredientCategory = !this.manageIngredientCategory;
  }

  getIngredientFromForm(): Ingredient | null {
    if(this.ingredientFormGroup.valid) {
      let formIngredient = new Ingredient(
          this.ingredientFormGroup.get("name")?.value,
          Number(this.ingredientFormGroup.get("unitaryPrice")?.value),
          this.ingredientFormGroup.get("unit")?.value,
          Number(this.ingredientFormGroup.get("stockQuantity")?.value),
          Number(this.ingredientFormGroup.get("ingredientCategory")?.value));
      formIngredient.id = this.ingredientId;
      if(this.ingredientFormGroup.get("allergenCategory")?.value != null){
        formIngredient.allergenCategoryId = Number(this.ingredientFormGroup.get("allergenCategory")?.value);
      }
      return formIngredient;
    }
    return null;
  }

  // called by Submit button
  createIngredient() {
    const ingredient: Ingredient | null = this.getIngredientFromForm();
    if (ingredient !== null) {
      this.ingredientService.createIngredient(ingredient).subscribe({
            next: (ingredient) => {
              alert(`Ingredient ${ingredient.name} created!`);
            }, error: (err) => {
              alert(`Error while creating ingredient ${ingredient.name}: ${err.message}`);
            }
          });
      this.router.navigate(['ingredients']);
    }
  }

  // called by Update button
  updateIngredient(): void {
    const ingredient: Ingredient | null = this.getIngredientFromForm();
    if (ingredient !== null) {
      this.ingredientService.updateIngredient(ingredient).subscribe({
        next: (data) => {
          alert(`Ingredient \"${ingredient.name}\" updated!`);
        }, error: (err) => {
          alert(`Error while updating ingredient \"${ingredient.name}\": ${err.message}`);
      }
      });
    }
  }

}
