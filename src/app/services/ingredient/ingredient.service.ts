import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Ingredient} from "../../models/ingredient/ingredient";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private httpService: HttpClient) { }

  jsonToIngredient(json: any): Ingredient{
    return new Ingredient(json.name, json.unitaryPrice, json.unit, json.id);
  }

  getAllIngredients(): Observable<Ingredient[]> {
    return this.httpService.get<Ingredient[]>("http://localhost:3000/ingredient");
  }

  createIngredient(ingredient: Ingredient): Observable<Ingredient>{
    return this.httpService.post<Ingredient>("http://localhost:3000/ingredient", ingredient);
  }
}
