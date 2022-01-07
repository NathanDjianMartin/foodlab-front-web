import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeExecution} from "../../../models/recipe-execution/recipe-execution";
import {Observable} from "rxjs";
import {RecipeExecutionService} from "../../../services/recipe-execution/recipe-execution.service";
import {StepWithinRecipeExecutionService} from "../../../services/step-within-recipe-execution/step-within-recipe-execution.service";
import {StepWithinRecipeExecution} from "../../../models/step-within-recipe-execution/step-within-recipe-execution";
import {LoggerService} from "../../../services/logger/logger.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add-progression-within-recipe-execution',
  templateUrl: './add-progression-within-recipe-execution.component.html',
  styleUrls: ['./add-progression-within-recipe-execution.component.css']
})
export class AddProgressionWithinRecipeExecutionComponent implements OnInit {
  @Input() recipeExecutionId!: number;
  progressions!: Observable<RecipeExecution[]>
  progression!: RecipeExecution
  @Output() isChangeEvent = new EventEmitter<number>();

  constructor(private recipeExecutionService: RecipeExecutionService,
              private stepWithinRecipeExecutionService: StepWithinRecipeExecutionService,
              private loggerService: LoggerService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.progressions = this.recipeExecutionService.getAllProgressions()
  }

  selectProgression(progression: RecipeExecution){
    this.progression = progression;
  }

  addProgression(){
    this.stepWithinRecipeExecutionService.createStepWithinRecipeExecution(
        new StepWithinRecipeExecution(this.progression.id!, this.recipeExecutionId)
    ).subscribe( (data) => {
      this.router.navigate(["/recipe/details", parseInt(this.route.snapshot.paramMap.get('id')!)]).then()
      this.loggerService.displaySuccess("Progression added!")
        }, (error) => {
      this.loggerService.displayError("Error in add a progression")
        }

    );
    this.isChangeEvent.emit(1);
  }

}
