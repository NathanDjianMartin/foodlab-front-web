import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../models/recipe/recipe";
import {IngredientWithinStep} from "../../../models/ingredient-within-step/ingredient-within-step";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {IngredientWithinStepService} from "../../../services/ingredient-within-step/ingredient-within-step.service";
import {Observable} from "rxjs";
import {RecipeExecution} from "../../../models/recipe-execution/recipe-execution";
import {StepWithinRecipeExecutionService} from "../../../services/step-within-recipe-execution/step-within-recipe-execution.service";
import {StepWithinRecipeExecution} from "../../../models/step-within-recipe-execution/step-within-recipe-execution";

@Component({
  selector: 'app-recipe-execution-list',
  templateUrl: './recipe-execution-list.component.html',
  styleUrls: ['./recipe-execution-list.component.css']
})
export class RecipeExecutionListComponent implements OnInit {
  @Input() recipeExecutionId?: number;

  stepsWithinRecipe!: Observable<StepWithinRecipeExecution[]>;

  constructor(private recipeService: RecipeService,
              private stepWithinRecipeExecutionService: StepWithinRecipeExecutionService) {
  }

  ngOnInit(): void {
     if(this.recipeExecutionId != null) {

       console.log("heyyyyyyyyyyyyyyyyy")
       this.stepsWithinRecipe = this.stepWithinRecipeExecutionService.getAllStepWithinRecipeExecution(this.recipeExecutionId);
       console.log(this.stepsWithinRecipe);

     }
  }



}
