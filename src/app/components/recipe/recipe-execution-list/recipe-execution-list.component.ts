import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "../../../models/recipe/recipe";
import {IngredientWithinStep} from "../../../models/ingredient-within-step/ingredient-within-step";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {IngredientWithinStepService} from "../../../services/ingredient-within-step/ingredient-within-step.service";
import {Observable} from "rxjs";
import {RecipeExecution} from "../../../models/recipe-execution/recipe-execution";
import {StepWithinRecipeExecutionService} from "../../../services/step-within-recipe-execution/step-within-recipe-execution.service";
import {StepWithinRecipeExecution} from "../../../models/step-within-recipe-execution/step-within-recipe-execution";
import {LoggerService} from "../../../services/logger/logger.service";

@Component({
  selector: 'app-recipe-execution-list',
  templateUrl: './recipe-execution-list.component.html',
  styleUrls: ['./recipe-execution-list.component.css']
})
export class RecipeExecutionListComponent implements OnInit {
  @Input() recipeExecutionId?: number;
  @Input() isRecipeExecutionGeneral!: boolean;
  @Output() isChangeEvent = new EventEmitter<number>();
  @Output() stepToUpdate = new EventEmitter<RecipeExecution>();

  stepsWithinRecipe!: StepWithinRecipeExecution[];

  constructor(private recipeService: RecipeService,
              private stepWithinRecipeExecutionService: StepWithinRecipeExecutionService,
              private loggerService: LoggerService) {
  }

  ngOnInit(): void {
     if(this.recipeExecutionId != null) {
       this.stepWithinRecipeExecutionService.getAllStepWithinRecipeExecution(this.recipeExecutionId).subscribe( (steps) => {

         this.stepsWithinRecipe = steps.sort(function compare(a,b) {

           if(a.number < b.number)
             return -1;
           if(a.number > b.number)
             return 1;
           return 0;
         });
       });
     }
  }

  select(){
    this.loggerService.displaySuccess("Selected");
  }

  updateStep(step: RecipeExecution){
    this.stepToUpdate.emit(step);
  }

  delete(step: StepWithinRecipeExecution){
    this.stepWithinRecipeExecutionService.deleteStepWithinRecipeExecution(step.id!).subscribe( (rowAffected) => {
      this.loggerService.displaySuccess("Step deleted!");
      this.ngOnInit();
    }, (error) => {
      this.loggerService.displayError("You cannot delete this step!")
    });
    //prévenir du changement
    this.isChangeEvent.emit(1);

  }



}
