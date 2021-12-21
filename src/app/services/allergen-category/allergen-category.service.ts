import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AllergenCategory} from "../../models/allergen-category/allergen-category";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AllergenCategoryService {

  constructor(private httpService: HttpClient) {
  }

  jsonToAllergenCategory(json: any): AllergenCategory {
    let allergenCategory = new AllergenCategory(json.name);
    allergenCategory.id = json.id;
    return allergenCategory
  }

  getAllAllergenCategories(): Observable<AllergenCategory[]> {
    return this.httpService.get<AllergenCategory[]>("http://localhost:3000/allergen-category").pipe(
        map(data =>
            data.map( json => this.jsonToAllergenCategory(json))));
  };

  createAllergenCategory(allergenCategory: AllergenCategory): Observable<AllergenCategory> {
    return this.httpService.post<AllergenCategory>("http://localhost:3000/allergen-category", allergenCategory);
  }
}
