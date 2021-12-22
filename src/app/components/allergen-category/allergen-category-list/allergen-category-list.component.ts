import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

import {AllergenCategory} from "../../../models/allergen-category/allergen-category";
import {AllergenCategoryService} from "../../../services/allergen-category/allergen-category.service";

@Component({
  selector: 'app-allergen-category-list',
  templateUrl: './allergen-category-list.component.html',
  styleUrls: ['./allergen-category-list.component.css']
})
export class AllergenCategoryListComponent implements OnInit {
  allergenCategories!: Observable<AllergenCategory[]>;

  constructor(private allergenCategoryService : AllergenCategoryService) { }

  ngOnInit(): void {
    this.allergenCategories = this.allergenCategoryService.getAllAllergenCategories();
  }

}
