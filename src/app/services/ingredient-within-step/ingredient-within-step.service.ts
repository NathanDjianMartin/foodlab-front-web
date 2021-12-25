import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IngredientWithinStep} from "../../models/ingredient-within-step/ingredient-within-step";
import {IngredientService} from "../ingredient/ingredient.service";
import {Recipe} from "../../models/recipe/recipe";

@Injectable({
  providedIn: 'root'
})
export class IngredientWithinStepService {

  constructor(private httpService: HttpClient,
              private ingredientService: IngredientService) { }

  jsonToIngredientWithinStep(json: any): IngredientWithinStep{
    console.log(json);
    let ingredientWithinStep: IngredientWithinStep =  new IngredientWithinStep(json.name, json.quantity, json.recipeExecutionId);
    ingredientWithinStep.id = json.id;
    if(json.ingredient){
      ingredientWithinStep.ingredientDetails = this.ingredientService.jsonToIngredient(json.ingredient);
    }
    console.log(ingredientWithinStep)
    return ingredientWithinStep;
  }

  getAllIngredientsInRecipe(id: number): Observable<IngredientWithinStep[]> {
    return this.httpService.get<IngredientWithinStep[]>(`http://localhost:3000/ingredient-within-step/ingredients/${id}`).pipe(
        map(data =>
            data.map( json => this.jsonToIngredientWithinStep(json))));
  }

  createIngredientWithinStep(ingredientWithinStep: IngredientWithinStep): Observable<IngredientWithinStep>{
    return this.httpService.post<IngredientWithinStep>("http://localhost:3000/ingredient-within-step", {
      "ingredientId": ingredientWithinStep.ingredientId,
      "recipeExecutionId": ingredientWithinStep.recipeExecutionId,
      "quantity": ingredientWithinStep.quantity
    });
  }}
