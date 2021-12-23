import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../../models/recipe/recipe";
import {IngredientWithinStep} from "../../../models/ingredient-within-step/ingredient-within-step";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {IngredientWithinStepService} from "../../../services/ingredient-within-step/ingredient-within-step.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recipe-execution-list',
  templateUrl: './recipe-execution-list.component.html',
  styleUrls: ['./recipe-execution-list.component.css']
})
export class RecipeExecutionListComponent implements OnInit {
  recipe!: Recipe;
  ingredientsWithinStep!: Observable<IngredientWithinStep[]>;

  constructor(private recipeService: RecipeService,
              private ingredientWithinStepService: IngredientWithinStepService) {
  }

  ngOnInit(): void {
    this.recipe = this.recipeService.currentRecipe!;
    if(this.recipe != null && this.recipe.recipeExecutionId != null) {
      this.ingredientsWithinStep = this.ingredientWithinStepService.getAllIngredientsInRecipe(this.recipe!.recipeExecutionId!);
    }
  }



}
