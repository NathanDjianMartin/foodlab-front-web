import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {StepWithinRecipeExecution} from "../../models/step-within-recipe-execution/step-within-recipe-execution";
import {RecipeExecution} from "../../models/recipe-execution/recipe-execution";
import {RecipeExecutionService} from "../recipe-execution/recipe-execution.service";

@Injectable({
  providedIn: 'root'
})
export class StepWithinRecipeExecutionService {
  constructor(private httpService: HttpClient,
              private recipeExecutionService: RecipeExecutionService) { }

  jsonToStepWithinRecipeExecution(json: any): StepWithinRecipeExecution{
    let stepWithinRecipeExecution: StepWithinRecipeExecution =  new StepWithinRecipeExecution(json.stepId, json.recipeExecutionId, json.number);
    stepWithinRecipeExecution.id = json.id;
    if(json.step){
      if(json.step.isStep){
        //si c'est une simple étape alors je l'ajoute à la liste des étapes de ma recette
        stepWithinRecipeExecution.recipeExecution = new RecipeExecution(json.isStep, json.stepTitle, json.stepDescription, json.duration)
        stepWithinRecipeExecution.recipeExecution.id = json.step.id;
      }else {
        //c'est une progression, il faut alors récupérer toute ses étapes
        //stepWithinRecipeExecution.recipeExecution!.steps = this.getAllStepWithinRecipeExecution(json.step.id);
      }
    }
    return stepWithinRecipeExecution;
  }

  getAllStepWithinRecipeExecution(id: number): Observable<RecipeExecution[]> {
    return this.httpService.get<RecipeExecution[]>(`http://localhost:3000/step-within-recipe-execution/steps/${id}`).pipe(
        map(data =>
            data.map( json => this.recipeExecutionService.jsonToRecipeExecution(json))));
  }

  createStepWithinRecipeExecution(stepWithinRecipeExecution: StepWithinRecipeExecution): Observable<StepWithinRecipeExecution>{
    return this.httpService.post<StepWithinRecipeExecution>("http://localhost:3000/step-within-recipe-execution", stepWithinRecipeExecution);
  }

  deleteStepWithinRecipeExecution(id: number){
    return this.httpService.delete<number>(`http://localhost:3000/step-within-recipe-execution/${id}`);
  }
}
