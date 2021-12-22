import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {RecipeCategory} from "../../models/recipe-category/recipe-category";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeCategoryService {
  constructor(private httpService: HttpClient) {
  }

  jsonToRecipeCategory(json: any): RecipeCategory {
    let recipeCategory = new RecipeCategory(json.name);
    recipeCategory.id = json.id;
    return recipeCategory;
  }

  getAllIngredientCategories(): Observable<RecipeCategory[]> {
    return this.httpService.get<RecipeCategory[]>("http://localhost:3000/recipe-category").pipe(
        map(data =>
            data.map( json => this.jsonToRecipeCategory(json))));
  };

  createRecipeCategory(recipeCategory: RecipeCategory): Observable<RecipeCategory> {
    return this.httpService.post<RecipeCategory>("http://localhost:3000/recipe-category", recipeCategory);
  }

  deleteRecipeCategory(id: number) {
    return this.httpService.delete<number>(`http://localhost:3000/recipe-category/${id}`);
  }
}
