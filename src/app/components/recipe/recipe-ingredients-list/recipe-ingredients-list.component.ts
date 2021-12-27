import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {Observable} from "rxjs";
import {IngredientWithinStepService} from "../../../services/ingredient-within-step/ingredient-within-step.service";
import {IngredientWithinStep} from "../../../models/ingredient-within-step/ingredient-within-step";
import {RecipeExecution} from "../../../models/recipe-execution/recipe-execution";
import {RecipeExecutionService} from "../../../services/recipe-execution/recipe-execution.service";
import {StepWithinRecipeExecutionService} from "../../../services/step-within-recipe-execution/step-within-recipe-execution.service";
import {StepWithinRecipeExecution} from "../../../models/step-within-recipe-execution/step-within-recipe-execution";

@Component({
  selector: 'app-recipe-ingredients-list',
  templateUrl: './recipe-ingredients-list.component.html',
  styleUrls: ['./recipe-ingredients-list.component.css']
})
export class RecipeIngredientsListComponent implements OnInit {
  @Input() stepId!: number; //RecipeExecutionId
  @Input() stepName!: string;
  ingredientsWithinStep!: IngredientWithinStep[];
  step!: RecipeExecution;
  steps!: StepWithinRecipeExecution[];
  progressionWithinStep!: StepWithinRecipeExecution[];

  constructor(private recipeService: RecipeService,
              private ingredientWithinStepService: IngredientWithinStepService,
              private recipeExecutionService: RecipeExecutionService,
              private stepWithinRecipeExecutionService: StepWithinRecipeExecutionService) {
  }

  ngOnInit(): void {
    console.log(this.stepId!);
    if(this.stepId != null) {
      //TODO: recalculer car probablement faut si la recette contient une progression qui contient elle même des progressions
      this.ingredientsWithinStep =this.ingredientWithinStepService.getAllIngredientsInRecipe(this.stepId!);
    }
    this.recipeExecutionService.getOne(this.stepId).subscribe( (step) => {
      this.step = step;
    })
    this.stepWithinRecipeExecutionService.getAllStepWithinRecipeExecution(this.stepId).subscribe( (steps) => {
      this.steps = steps;
    })
    this.stepWithinRecipeExecutionService.getAllProgressionWithinRecipeExecution(this.stepId).subscribe( (progressions) => {
      this.progressionWithinStep = progressions;
    })
  }


}
