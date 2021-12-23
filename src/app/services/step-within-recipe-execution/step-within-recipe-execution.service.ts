import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {StepWithinRecipeExecution} from "../../models/step-within-recipe-execution/step-within-recipe-execution";

@Injectable({
  providedIn: 'root'
})
export class StepWithinRecipeExecutionService {
  constructor(private httpService: HttpClient) { }

  jsonToStepWithinRecipeExecution(json: any): StepWithinRecipeExecution{
    let stepWithinRecipeExecution: StepWithinRecipeExecution =  new StepWithinRecipeExecution(json.stepId, json.recipeExecutionId, json.number);
    stepWithinRecipeExecution.id = json.id;
    return stepWithinRecipeExecution;
  }

  getAllStepWithinRecipeExecution(): Observable<StepWithinRecipeExecution[]> {
    return this.httpService.get<StepWithinRecipeExecution[]>("http://localhost:3000/step-within-recipe-execution").pipe(
        map(data =>
            data.map( json => this.jsonToStepWithinRecipeExecution(json))));
  }

  createStepWithinRecipeExecution(stepWithinRecipeExecution: StepWithinRecipeExecution): Observable<StepWithinRecipeExecution>{
    return this.httpService.post<StepWithinRecipeExecution>("http://localhost:3000/step-within-recipe-execution", stepWithinRecipeExecution);
  }

  deleteStepWithinRecipeExecution(id: number){
    return this.httpService.delete<number>(`http://localhost:3000/step-within-recipe-execution/${id}`);
  }
}
