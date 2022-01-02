import {AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {RecipeCategoryService} from "../../../services/recipe-category/recipe-category.service";
import {RecipeCategory} from "../../../models/recipe-category/recipe-category";
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";

@Component({
  selector: 'app-display-recipes',
  templateUrl: './display-recipes.component.html',
  styleUrls: ['./display-recipes.component.css']
})
export class DisplayRecipesComponent implements OnInit {

  categories! : Observable<RecipeCategory[]>;
  recipesByCategory: Map<RecipeCategory, Recipe[]> = new Map();
  filteredRecipesByCategory: Map<RecipeCategory, Recipe[]> = new Map();

  constructor(
      private recipeCategoryService: RecipeCategoryService,
      private recipeService: RecipeService
      ) {}

  ngOnInit(): void {
    this.categories = this.recipeCategoryService.getAllRecipeCategories();
    this.categories.subscribe({
      next: (categories) => {
        for (let category of categories) {
          this.recipeService.getManyByCategory(category.id!).subscribe({
            next: (recipes) => {
              this.recipesByCategory.set(category, recipes);
              this.filteredRecipesByCategory.set(category, recipes);
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
        this.filteredRecipesByCategory.set(category, recipes.filter(recipe => recipe.author.toLocaleLowerCase().includes(event)));
      }
    } else {
      this.resetFilter();
    }
  }

  resetFilter() {
    for (let entry of this.recipesByCategory.entries()) {
      this.filteredRecipesByCategory.set(entry[0], entry[1]);
    }
  }
}
