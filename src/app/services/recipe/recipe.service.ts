import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Recipe} from "../../models/recipe/recipe";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  currentRecipe?: Recipe;

  constructor(private httpService: HttpClient) { }

  jsonToRecipe(json: any): Recipe{
    console.log(json);
    let recipe: Recipe =  new Recipe(json.name, json.author, json.guestsNumber, json.recipeCategory.id);
    recipe.id = json.id;
    recipe.recipeCategoryName = json.recipeCategory.name;
    if(json.recipeExecutionId != null) {
      recipe.recipeExecutionId = json.recipeExecutionId
    }
    console.log(recipe.recipeExecutionId)
    return recipe;
  }

  selectRecipe(selectedRecipe :Recipe){
    this.currentRecipe = selectedRecipe;
  }

  getOneRecipe(): Observable<Recipe> {
    let id = this.currentRecipe!.id;
    return this.httpService.get<Recipe>(`http://localhost:3000/recipe/${id}`).pipe(
        map( json => this.jsonToRecipe(json))
    )
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.httpService.get<Recipe[]>("http://localhost:3000/recipe").pipe(
        map(data =>
            data.map( json => this.jsonToRecipe(json))));
  }

  createRecipe(recipe: Recipe): Observable<Recipe>{
    return this.httpService.post<Recipe>("http://localhost:3000/recipe", recipe);
  }

  deleteRecipe(id: number){
    return this.httpService.delete<number>(`http://localhost:3000/recipe/${id}`);
  }
}
