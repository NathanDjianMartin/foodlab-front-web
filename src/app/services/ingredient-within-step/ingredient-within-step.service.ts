import { Injectable } from '@angular/core';
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IngredientWithinStep} from "../../models/ingredient-within-step/ingredient-within-step";
import {IngredientService} from "../ingredient/ingredient.service";
import {StepWithinRecipeExecutionService} from "../step-within-recipe-execution/step-within-recipe-execution.service";
import {Ingredient} from "../../models/ingredient/ingredient";

@Injectable({
  providedIn: 'root'
})
export class IngredientWithinStepService {

  constructor(private httpService: HttpClient,
              private ingredientService: IngredientService,
              private stepWithinRecipeExecutionService: StepWithinRecipeExecutionService) {
  }

  jsonToIngredientWithinStep(json: any): IngredientWithinStep {
    let ingredientWithinStep: IngredientWithinStep = new IngredientWithinStep(json.ingredientId, json.quantity, json.recipeExecutionId);
    ingredientWithinStep.id = json.id;
    if (json.ingredient) {
      ingredientWithinStep.ingredientDetails = this.ingredientService.jsonToIngredient(json.ingredient);
    }
    return ingredientWithinStep;
  }

  getAllIngredientsInSimpleStep(id: number): Observable<IngredientWithinStep[]> {
    return this.httpService.get<IngredientWithinStep[]>(`http://localhost:3000/recipe-execution/all-ingredients-within-a-step-in-simple-step/${id}`).pipe(
        map(data =>
            data.map(json => this.jsonToIngredientWithinStep(json))));
  }

  getAllIngredientsWithinAStepInSimpleStepsInRecipeExecution(id: number): Observable<IngredientWithinStep[]> {
    //Objectif: retourner tout les ingrédients contenu dans les etapes d'une recette qui ne sont pas des progressions.
    return this.httpService.get<IngredientWithinStep[]>(`http://localhost:3000/recipe-execution/all-ingredients-within-a-step-in-simple-steps-in-recipe-execution/${id}`).pipe(
        map(data =>
            data.map(json => this.jsonToIngredientWithinStep(json))));
  }

  getAllIngredientsInRecipe(id: number): Observable<Ingredient[]> {
    return this.httpService.get<Ingredient[]>(`http://localhost:3000/recipe/ingredients-in-recipe/${id}`);
  }

  createIngredientWithinStep(ingredientWithinStep: IngredientWithinStep): Observable<IngredientWithinStep> {
    console.log({
      "ingredientId": ingredientWithinStep.ingredientId,
      "recipeExecutionId": ingredientWithinStep.recipeExecutionId,
      "quantity": ingredientWithinStep.quantity
    })
    return this.httpService.post<IngredientWithinStep>("http://localhost:3000/ingredient-within-step", {
      "ingredientId": ingredientWithinStep.ingredientId,
      "recipeExecutionId": ingredientWithinStep.recipeExecutionId,
      "quantity": ingredientWithinStep.quantity
    });
  }

  deleteAllIngredientsInAStep(stepId: number): Observable<number>{
    return this.httpService.delete<number>(`http://localhost:3000/ingredient-within-step/delete-all-in-a-step/${stepId}`)
  }
}
