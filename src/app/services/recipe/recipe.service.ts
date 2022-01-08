import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Recipe} from "../../models/recipe/recipe";
import {Observable} from "rxjs";
import {Ingredient} from "../../models/ingredient/ingredient";
import {IngredientWithinStep} from "../../models/ingredient-within-step/ingredient-within-step";

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
    if(json.recipeExecutionId != null) {
      recipe.recipeExecutionId = json.recipeExecutionId
    }
    console.log(recipe.recipeExecutionId)
    return recipe;
  }

  getOneRecipe(id: number): Observable<Recipe>{
    return this.httpService.get<Recipe>(`http://localhost:3000/recipe/${id}`).pipe(
        map( json => this.jsonToRecipe(json))
    )
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.httpService.get<Recipe[]>("http://localhost:3000/recipe").pipe(
        map(data =>
            data.map( json => this.jsonToRecipe(json))));
  }

  getManyByCategory(idCategory: number): Observable<Recipe[]>{
    return this.httpService.get<Recipe[]>(`http://localhost:3000/recipe/category/${idCategory}`).pipe(
        map(data =>
            data.map( json => this.jsonToRecipe(json))));
  }

  getAllIngredientsWithinStepInRecipe(idRecipe: number): Observable<IngredientWithinStep[]>{
    return this.httpService.get<Recipe[]>(`http://localhost:3000/recipe/category/${idCategory}`).pipe(
        map(data =>
            data.map( json => this(json))));
  }

  createRecipe(recipe: Recipe): Observable<Recipe>{
    console.log(recipe);
    return this.httpService.post<Recipe>("http://localhost:3000/recipe", {
      name: recipe.name,
      author: recipe.author,
      guestsNumber: recipe.guestsNumber,
      recipeCategoryId: Number(recipe.recipeCategory),
    });
  }

  updateRecipe(recipe: Recipe): Observable<Recipe>{
    //TODO: vérifier id not null ou undifined
    return this.httpService.patch<Recipe>(`http://localhost:3000/recipe/${recipe.id!}`, {
      name: recipe.name,
      author: recipe.author,
      guestsNumber: recipe.guestsNumber,
      recipeCategoryId: recipe.recipeCategory,
      recipeExecutionId: recipe.recipeExecutionId
    });
  }

  deleteRecipe(id: number){
    return this.httpService.delete<number>(`http://localhost:3000/recipe/${id}`);
  }

  getIngredientsCost(id: number): Observable<number> {
    return this.httpService.get<number>(`http://localhost:3000/recipe/ingredient-cost/${id}`)
  }

  getDuration(id: number): Observable<number> {
    return this.httpService.get<number>(`http://localhost:3000/recipe/duration/${id}`)
  }
}
