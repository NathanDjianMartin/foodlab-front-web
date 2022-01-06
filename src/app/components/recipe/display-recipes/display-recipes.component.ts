import {AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {RecipeCategoryService} from "../../../services/recipe-category/recipe-category.service";
import {RecipeCategory} from "../../../models/recipe-category/recipe-category";
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {IngredientWithinStepService} from "../../../services/ingredient-within-step/ingredient-within-step.service";
import {Ingredient} from "../../../models/ingredient/ingredient";
import {IngredientWithinStep} from "../../../models/ingredient-within-step/ingredient-within-step";

@Component({
  selector: 'app-display-recipes',
  templateUrl: './display-recipes.component.html',
  styleUrls: ['./display-recipes.component.css']
})
export class DisplayRecipesComponent implements OnInit {

  categories! : Observable<RecipeCategory[]>;
  recipesByCategory: Map<RecipeCategory, Recipe[]> = new Map();
  filteredRecipesByCategory: Map<RecipeCategory, Recipe[]> = new Map();
  filterSelect!: any;

  constructor(
      private recipeCategoryService: RecipeCategoryService,
      private recipeService: RecipeService,
      private ingredientWithinStepService: IngredientWithinStepService
  ) {}

  ngOnInit(): void {

    // loads the select element
    document.addEventListener('DOMContentLoaded', function() {
      let elems = document.querySelectorAll('select');
      M.FormSelect.init(elems);
    });

    this.categories = this.recipeCategoryService.getAllRecipeCategories();
    this.categories.subscribe({
      next: (categories) => {
        for (let category of categories) {
          this.recipeService.getManyByCategory(category.id!).subscribe({
            next: (recipes) => {
              this.recipesByCategory.set(category, recipes);
              this.filteredRecipesByCategory.set(category, recipes);

              // For each recipe, sets its "ingredient" attribute with the list of its ingredients
              for (let recipe of recipes) {
                this.ingredientWithinStepService.getAllIngredientsInRecipe(recipe.id!).subscribe({
                  next: (ingredients) => {
                    recipe.ingredient = ingredients;
                  }
                });
              }
            }
          });
        }
      }
    });
  }

  onSearch(event: string) {
    // TODO manage multiple filter types (cost, number of guests...)
    if (event !== "") {
      for (let entry of this.filteredRecipesByCategory.entries()) {
        let category: RecipeCategory = entry[0];
        let recipes: Recipe[] = entry[1];

        switch (this.filterSelect) {
          case "1": { // Name
            this.filteredRecipesByCategory.set(category, recipes.filter(recipe => recipe.name.toLowerCase().includes(event)));
            break;
          }
          case "2": { // Ingredient
            this.filteredRecipesByCategory.set(category, recipes.filter(recipe => this.recipeContainsIngredient(recipe, event)));
            break;
          }
          case "3": { // Author
            this.filteredRecipesByCategory.set(category, recipes.filter(recipe => recipe.author.toLowerCase().includes(event)));
            break;
          }
        }
      }
    } else {
      this.resetFilter();
    }
  }




  private recipeContainsIngredient(recipe: Recipe, ingredientNameChunk: string): boolean {
    for (let ingredient of recipe.ingredient!) {
      if (ingredient.name.toLowerCase().includes(ingredientNameChunk)) {
        return true;
      }
    }
    return false;
  }

  resetFilter() {
    for (let entry of this.recipesByCategory.entries()) {
      this.filteredRecipesByCategory.set(entry[0], entry[1]);
    }
  }
}
