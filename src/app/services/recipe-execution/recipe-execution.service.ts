import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {RecipeExecution} from "../../models/recipe-execution/recipe-execution";

@Injectable({
  providedIn: 'root'
})
export class RecipeExecutionService {
  constructor(private httpService: HttpClient) { }

  jsonToRecipeExecution(json: any): RecipeExecution{
    let recipeExecution: RecipeExecution =  new RecipeExecution(json.isStep, json.stepTitle);
    if(json.stepDescription && json.duration){
      recipeExecution.stepDescription = json.stepDescription;
      recipeExecution.duration = json.duration;
    }
    recipeExecution.id = json.id;
    if(json.recipeExecutionId != null) {
      recipeExecution.recipeExecutionId = json.recipeExecutionId
    }
    return recipeExecution;
  }

  getAllRecipesExecution(): Observable<RecipeExecution[]> {
    return this.httpService.get<RecipeExecution[]>("http://localhost:3000/recipe-execution").pipe(
        map(data =>
            data.map( json => this.jsonToRecipeExecution(json))));
  }

  getOne(id: number): Observable<RecipeExecution> {
    return this.httpService.get<RecipeExecution>(`http://localhost:3000/recipe-execution/${id}`).pipe(
        map( json => this.jsonToRecipeExecution(json))
    );
  }

  createRecipeExecution(recipeExecution: RecipeExecution): Observable<RecipeExecution>{
    return this.httpService.post<RecipeExecution>("http://localhost:3000/recipe-execution", recipeExecution);
  }

  deleteRecipeExecution(id: number){
    return this.httpService.delete<number>(`http://localhost:3000/recipe-execution/${id}`);
  }
}
