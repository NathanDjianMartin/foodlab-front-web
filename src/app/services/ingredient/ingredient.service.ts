import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ingredient} from "../../models/ingredient/ingredient";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private httpService: HttpClient) { }

  jsonToIngredient(json: any): Ingredient {
    let ingredient: Ingredient =  new Ingredient(json.name, json.unitaryPrice, json.unit, json.stockQuantity, json.ingredientCategoryId);
    ingredient.id = json.id;
    if (json.allergenCategoryId) {
      ingredient.allergenCategoryId = json.allergenCategoryId;
    }
    if (json.ingredientCategory) {
      ingredient.ingredientCategoryId = json.ingredientCategoryId
      ingredient.ingredientCategoryName = json.ingredientCategory.name;
    }
    return ingredient;
  }

  getAllIngredients(): Observable<Ingredient[]> {
    return this.httpService.get<Ingredient[]>("http://localhost:3000/ingredient").pipe(
        map(data =>
            data.map( json => this.jsonToIngredient(json))));
  }

  getOne(id: number): Observable<Ingredient> {
    return this.httpService.get<Ingredient>(`http://localhost:3000/ingredient/${id}`).pipe(
        map( json => this.jsonToIngredient(json))
    )
  }

  getManyByCategory(idCategory: number): Observable<Ingredient[]>{
    return this.httpService.get<Ingredient[]>(`http://localhost:3000/ingredient/category/${idCategory}`).pipe(
        map(data =>
            data.map( json => this.jsonToIngredient(json))));
  }

  createIngredient(ingredient: Ingredient): Observable<Ingredient>{
    return this.httpService.post<Ingredient>("http://localhost:3000/ingredient", ingredient);
  }

  deleteIngredient(id: number){
    return this.httpService.delete<number>(`http://localhost:3000/ingredient/${id}`);
  }

  updateIngredient(ingredient: Ingredient){
    return this.httpService.patch(`http://localhost:3000/ingredient/${ingredient.id}`, {
      "name": ingredient.name,
      "unitaryPrice": ingredient.unitaryPrice,
      "unit": ingredient.unit,
      "stockQuantity": ingredient.stockQuantity,
      "ingredientCategoryId": ingredient.ingredientCategoryId,
      "allergenCategoryId": ingredient.allergenCategoryId? ingredient.allergenCategoryId : null
    })
  }

  updateStockQuantityIngredient(ingredient: Ingredient) {
    return this.httpService.patch(`http://localhost:3000/ingredient/${ingredient.id}`, {
      "stockQuantity": ingredient.stockQuantity,
    })
  }
}
