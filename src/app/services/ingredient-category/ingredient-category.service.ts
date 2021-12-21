import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IngredientCategory} from "../../models/ingredient-category/ingredient-category";

@Injectable({
    providedIn: 'root'
})
export class IngredientCategoryService {

    constructor(private httpService: HttpClient) {
    }

    jsonToIngredientCategory(json: any): IngredientCategory {
        return new IngredientCategory(json.name, json.id);
    }

    getAllIngredientCategories(): Observable<IngredientCategory[]> {
        return this.httpService.get<IngredientCategory[]>("http://localhost:3000/ingredient-category");
    }

    createIngredientCategory(ingredientCategory: IngredientCategory): Observable<IngredientCategory> {
        return this.httpService.post<IngredientCategory>("http://localhost:3000/ingredient", ingredientCategory);
    }
}
