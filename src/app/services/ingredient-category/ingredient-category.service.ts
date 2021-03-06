import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IngredientCategory} from "../../models/ingredient-category/ingredient-category";
import {map} from "rxjs/operators";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class IngredientCategoryService {

    constructor(private httpService: HttpClient) {
    }

    jsonToIngredientCategory(json: any): IngredientCategory {
        let ingredientCategory = new IngredientCategory(json.name);
        ingredientCategory.id = json.id;
        return ingredientCategory;
    }

    getAllIngredientCategories(): Observable<IngredientCategory[]> {
        return this.httpService.get<IngredientCategory[]>(`${environment.apiUrl}/ingredient-category`).pipe(
            map(data =>
                data.map( json => this.jsonToIngredientCategory(json))));
    };

    createIngredientCategory(ingredientCategory: IngredientCategory): Observable<IngredientCategory> {
        return this.httpService.post<IngredientCategory>(`${environment.apiUrl}/ingredient-category`, ingredientCategory);
    }

    deleteIngredientCategory(id: number) {
        return this.httpService.delete<number>(`${environment.apiUrl}/ingredient-category/${id}`);
    }
}
