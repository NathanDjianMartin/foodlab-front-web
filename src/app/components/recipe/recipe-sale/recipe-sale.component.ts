import {Component, Input, OnInit} from '@angular/core';
import {CostDataService} from "../../../services/cost-data/cost-data.service";
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {IngredientWithinStepService} from "../../../services/ingredient-within-step/ingredient-within-step.service";
import {LoggerService} from "../../../services/logger/logger.service";

@Component({
  selector: 'app-recipe-sale',
  templateUrl: './recipe-sale.component.html',
  styleUrls: ['./recipe-sale.component.css']
})
export class RecipeSaleComponent implements OnInit {

  @Input() recipe?: Recipe;
  salePrice: number = 0;

  constructor(
      private recipeService: RecipeService,
      private loggerService: LoggerService
  ) { }

  ngOnInit(): void {
    if (this.recipe) {
      this.recipeService.getAllIngredients(this.recipe.id!).subscribe({
        next: (ingredients) => {
          this.recipe!.ingredient = ingredients;
        }, error: (err) => {
          this.loggerService.displayError(`Error while fetching recipe ingredients list: ${err.error.message}`)
        }
      });
    }
  }

  sellRecipe(): void {
    this.recipeService.sellRecipe(this.recipe!.id!).subscribe({
      next: (data) => {
        this.loggerService.displaySuccess('Recipe sold!');
      }, error: (err) => {
        this.loggerService.displayError(`Error while selling recipe: ${err.error.error}`);
      }
    });
  }

  printLabel(): void {
    window.print();
  }
}
