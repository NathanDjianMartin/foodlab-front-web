import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RecipeExecution} from "../../../models/recipe-execution/recipe-execution";
import {Observable} from "rxjs";
import {RecipeExecutionService} from "../../../services/recipe-execution/recipe-execution.service";
import {StepWithinRecipeExecutionService} from "../../../services/step-within-recipe-execution/step-within-recipe-execution.service";
import {StepWithinRecipeExecution} from "../../../models/step-within-recipe-execution/step-within-recipe-execution";
import {LoggerService} from "../../../services/logger/logger.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../../../services/recipe/recipe.service";

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
              private recipeService: RecipeService,
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
    //En premier on vérif que la recipeExecution est déjà créé
    if(this.recipeExecutionId == null){
      //si ça n'est pas le cas, on en créer une
      //on va récupérer les infos de la recette à laquelle on ajoute la progression (on va donner le même nom qu'a la recette
      if(this.route.snapshot.paramMap.get('id') != undefined) {
        let id = parseInt(this.route.snapshot.paramMap.get('id')!);
        this.recipeService.getOneRecipe(id).subscribe(async (r) => {
          let recipe = r
          await this.recipeExecutionService.createRecipeExecution(
              new RecipeExecution(false, recipe.name)).subscribe( (progression) => {
            this.recipeExecutionId = progression.id!;
            recipe.recipeExecutionId = this.recipeExecutionId;
            this.recipeService.updateRecipe(recipe).subscribe();
            this.addProgressionInRecipeExecution();
          })
        });
      }
    }
    this.addProgressionInRecipeExecution();
  }

  //TODO: renommer les fonctions
  addProgressionInRecipeExecution(){
    this.stepWithinRecipeExecutionService.createStepWithinRecipeExecution(
        new StepWithinRecipeExecution(this.progression.id!, this.recipeExecutionId)
    ).subscribe( (data) => {
          window.location.reload();
          //this.loggerService.displaySuccess("Progression added!")
        }, (error) => {
          this.loggerService.displayError(error.error.error);
        }

    );
    this.isChangeEvent.emit(1);
  }

}
