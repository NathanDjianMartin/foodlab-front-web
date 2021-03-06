import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {RecipeExecution} from "../../models/recipe-execution/recipe-execution";
import {environment} from "../../../environments/environment";

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
    return recipeExecution;
  }

  getAllRecipesExecution(): Observable<RecipeExecution[]> {
    return this.httpService.get<RecipeExecution[]>(`${environment.apiUrl}/recipe-execution`).pipe(
        map(data =>
            data.map( json => this.jsonToRecipeExecution(json))));
  }

  getAllProgressions(): Observable<RecipeExecution[]> {
    return this.httpService.get<RecipeExecution[]>(`${environment.apiUrl}/recipe-execution/progressions`).pipe(
        map(data =>
            data.map( json => this.jsonToRecipeExecution(json))));
  }

  getOne(id: number): Observable<RecipeExecution> {
    return this.httpService.get<RecipeExecution>(`${environment.apiUrl}/recipe-execution/${id}`).pipe(
        map( json => this.jsonToRecipeExecution(json))
    );
  }

  createRecipeExecution(recipeExecution: RecipeExecution): Observable<RecipeExecution>{
    return this.httpService.post<RecipeExecution>(`${environment.apiUrl}/recipe-execution`, recipeExecution);
  }

  updateRecipeExecution(recipeExecution: RecipeExecution): Observable<RecipeExecution>{
    return this.httpService.patch<RecipeExecution>(`${environment.apiUrl}/recipe-execution/${recipeExecution.id}`, {
      stepTitle: recipeExecution.stepTitle,
      stepDescription: recipeExecution.stepDescription,
      duration: recipeExecution.duration
    });
  }

  deleteRecipeExecution(id: number){
    return this.httpService.delete<number>(`${environment.apiUrl}/recipe-execution/${id}`);
  }
}
