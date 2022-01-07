import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {RecipeCategory} from "../../models/recipe-category/recipe-category";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

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

  getAllRecipeCategories(): Observable<RecipeCategory[]> {
    return this.httpService.get<RecipeCategory[]>(`${environment.apiUrl}/recipe-category`).pipe(
        map(data =>
            data.map( json => this.jsonToRecipeCategory(json))));
  };

  createRecipeCategory(recipeCategory: RecipeCategory): Observable<RecipeCategory> {
    return this.httpService.post<RecipeCategory>(`${environment.apiUrl}/recipe-category`, recipeCategory);
  }

  deleteRecipeCategory(id: number) {
    return this.httpService.delete<number>(`${environment.apiUrl}/recipe-category/${id}`);
  }
}
