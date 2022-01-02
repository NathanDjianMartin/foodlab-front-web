import {Component, Input, OnInit} from '@angular/core';
import {RecipeExecution} from "../../../models/recipe-execution/recipe-execution";
import {Observable} from "rxjs";
import {RecipeExecutionService} from "../../../services/recipe-execution/recipe-execution.service";
import {StepWithinRecipeExecutionService} from "../../../services/step-within-recipe-execution/step-within-recipe-execution.service";
import {StepWithinRecipeExecution} from "../../../models/step-within-recipe-execution/step-within-recipe-execution";

@Component({
  selector: 'app-add-progression-within-recipe-execution',
  templateUrl: './add-progression-within-recipe-execution.component.html',
  styleUrls: ['./add-progression-within-recipe-execution.component.css']
})
export class AddProgressionWithinRecipeExecutionComponent implements OnInit {
  @Input() recipeExecutionId!: number;
  progressions!: Observable<RecipeExecution[]>
  progression!: RecipeExecution

  constructor(private recipeExecutionService: RecipeExecutionService,
              private stepWithinRecipeExecutionService: StepWithinRecipeExecutionService) { }

  ngOnInit(): void {
    this.progressions = this.recipeExecutionService.getAllProgressions()
  }

  selectProgression(progression: RecipeExecution){
    this.progression = progression;
  }

  addProgression(){
    this.stepWithinRecipeExecutionService.createStepWithinRecipeExecution(new StepWithinRecipeExecution(this.progression.id!, this.recipeExecutionId,1)).subscribe();
  }

}
