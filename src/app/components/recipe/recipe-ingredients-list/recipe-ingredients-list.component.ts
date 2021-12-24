import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {Observable} from "rxjs";
import {IngredientWithinStepService} from "../../../services/ingredient-within-step/ingredient-within-step.service";
import {IngredientWithinStep} from "../../../models/ingredient-within-step/ingredient-within-step";

@Component({
  selector: 'app-recipe-ingredients-list',
  templateUrl: './recipe-ingredients-list.component.html',
  styleUrls: ['./recipe-ingredients-list.component.css']
})
export class RecipeIngredientsListComponent implements OnInit {
  @Input() recipe!: Recipe;
  ingredientsWithinStep!: Observable<IngredientWithinStep[]>;

  constructor(private recipeService: RecipeService,
              private ingredientWithinStepService: IngredientWithinStepService) {
  }

  ngOnInit(): void {
    console.log(this.recipe!.recipeExecutionId!);
    if(this.recipe != null && this.recipe.recipeExecutionId != null) {
      //TODO: recalculer car probablement faut si la recette contient une progression qui contient elle même des progressions
      this.ingredientsWithinStep = this.ingredientWithinStepService.getAllIngredientsInRecipe(this.recipe!.recipeExecutionId!);
    }
  }


}
