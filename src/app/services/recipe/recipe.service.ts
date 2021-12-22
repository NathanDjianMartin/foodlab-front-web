import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Recipe} from "../../models/recipe/recipe";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private httpService: HttpClient) { }

  jsonToRecipe(json: any): Recipe{
    console.log(json);
    let recipe: Recipe =  new Recipe(json.name, json.author, json.guestsNumber, json.recipeCategory.id);
    recipe.id = json.id;
    recipe.recipeCategoryName = json.recipeCategory.name;
    return recipe;
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