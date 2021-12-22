import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {RecipeCategoryService} from "../../../services/recipe-category/recipe-category.service";
import {RecipeCategory} from "../../../models/recipe-category/recipe-category";
import {Recipe} from "../../../models/recipe/recipe";

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
  recipeCategories!: Observable<RecipeCategory[]>;
  recipeFormGroup!: FormGroup;
  managerecipeCategory!: boolean;

  constructor(
      private router : Router,
      private recipeService: RecipeService,
      private recipeCategoryService: RecipeCategoryService,
      private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.managerecipeCategory = false;
    this.recipeCategories = this.recipeCategoryService.getAllIngredientCategories();
    this.recipeFormGroup = this.fb.group({
      name:[null, [Validators.required]],
      author:[null, [Validators.required]],
      guestsNumber:[null,[Validators.required]],
      recipeCategory:[null,[Validators.required]]});
  }


  manageRecipeCategoryAction() {
    this.managerecipeCategory = true;
  }


  createRecipe(){
    if(this.recipeFormGroup.valid){
      let recipe = new Recipe(
          this.recipeFormGroup.get("name")?.value,
          this.recipeFormGroup.get("author")?.value,
          this.recipeFormGroup.get("guestsNumber")?.value,
          this.recipeFormGroup.get("recipeCategory")?.value);
      console.log(recipe)
      this.recipeService.createRecipe(recipe).subscribe(recipe => console.log("recipe crée"));
      this.router.navigate(['recipes']);
    }
  }

}
