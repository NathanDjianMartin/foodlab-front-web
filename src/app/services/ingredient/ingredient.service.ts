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

  jsonToIngredient(json: any): Ingredient{
    console.log(json);
    let ingredient: Ingredient =  new Ingredient(json.name, json.unitaryPrice, json.unit, json.stockQuantity, json.ingredientCategoryId);
    ingredient.id = json.id;
    if(json.allergenCategory){
      ingredient.allergenCategory = json.allergenCategory;
    }
    ingredient.ingredientCategoryName = json.ingredientCategory.name;
    return ingredient;
  }

  getAllIngredients(): Observable<Ingredient[]> {
    return this.httpService.get<Ingredient[]>("http://localhost:3000/ingredient").pipe(
        map(data =>
            data.map( json => this.jsonToIngredient(json))));
  }

  createIngredient(ingredient: Ingredient): Observable<Ingredient>{
    return this.httpService.post<Ingredient>("http://localhost:3000/ingredient", ingredient);
  }

  deleteIngredient(id: number){
    return this.httpService.delete<number>(`http://localhost:3000/ingredient/${id}`);
  }
}
