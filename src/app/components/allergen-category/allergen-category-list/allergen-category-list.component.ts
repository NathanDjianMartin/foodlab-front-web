import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

import {AllergenCategory} from "../../../models/allergen-category/allergen-category";
import {AllergenCategoryService} from "../../../services/allergen-category/allergen-category.service";
import {LoggerService} from "../../../services/logger/logger.service";

@Component({
  selector: 'app-allergen-category-list',
  templateUrl: './allergen-category-list.component.html',
  styleUrls: ['./allergen-category-list.component.css']
})
export class AllergenCategoryListComponent implements OnInit {
  allergenCategories!: Observable<AllergenCategory[]>;

  constructor(
      private allergenCategoryService : AllergenCategoryService,
      public loggerService : LoggerService) { }

  ngOnInit(): void {
    this.allergenCategories = this.allergenCategoryService.getAllAllergenCategories();
  }

  deleteAllergenCategory(allergenCategory: AllergenCategory) {
    this.allergenCategoryService.deleteAllergenCategory(allergenCategory.id!).subscribe(
        (data) => {
          this.ngOnInit()
        },
        (error) => {
          this.loggerService.displayError("This category corresponds to several ingredient, you cannot delete it")
        }
    );
  }

}
