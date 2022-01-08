import {Component, Input, OnInit} from '@angular/core';
import {RecipeExecution} from "../../../models/recipe-execution/recipe-execution";
import {StepWithinRecipeExecutionService} from "../../../services/step-within-recipe-execution/step-within-recipe-execution.service";
import {StepWithinRecipeExecution} from "../../../models/step-within-recipe-execution/step-within-recipe-execution";
import {LoggerService} from "../../../services/logger/logger.service";

@Component({
  selector: 'app-update-order-steps',
  templateUrl: './update-order-steps.component.html',
  styleUrls: ['./update-order-steps.component.css']
})
export class UpdateOrderStepsComponent implements OnInit {
  @Input() recipeExecutionId!: number;
  steps!: StepWithinRecipeExecution[]
  constructor(private stepWithinRecipeExecutionService: StepWithinRecipeExecutionService,
              private loggerService: LoggerService) { }

  ngOnInit(): void {
    this.stepWithinRecipeExecutionService.getAllStepWithinRecipeExecution(this.recipeExecutionId).subscribe( (steps) => {
      this.steps = steps;
    })
  }

  numberChange(step: StepWithinRecipeExecution, nb:number){
    step.number = nb;
  }

  validate(){
    this.stepWithinRecipeExecutionService.updateStepsOrderOfRecipeExecution(this.steps).subscribe( (steps) => {
      this.loggerService.displaySuccess("changement ordre ok")
    }, (error) => {
      this.loggerService.displayError(error.error.error);
    }
  );
  }

}
