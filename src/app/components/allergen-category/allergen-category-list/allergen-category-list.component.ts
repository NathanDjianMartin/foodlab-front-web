import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

import {AllergenCategory} from "../../../models/allergen-category/allergen-category";
import {AllergenCategoryService} from "../../../services/allergen-category/allergen-category.service";
import {LoggerService} from "../../../services/logger/logger.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-allergen-category-list',
  templateUrl: './allergen-category-list.component.html',
  styleUrls: ['./allergen-category-list.component.css']
})
export class AllergenCategoryListComponent implements OnInit {
  allergenCategories!: AllergenCategory[];
  allergenCategoryFormGroup!: FormGroup;

  constructor(
      private allergenCategoryService : AllergenCategoryService,
      public loggerService : LoggerService,
      private fb: FormBuilder) { }

  ngOnInit(): void {
    this.allergenCategoryService.getAllAllergenCategories().subscribe({
      next: (allergenCategories) => {
        this.allergenCategories = allergenCategories;
      }
    });
    this.init();
  }

  init(){
    this.allergenCategoryFormGroup = this.fb.group({
      name:[null,[Validators.required]]
    })
  }

  deleteAllergenCategory(allergenCategory: AllergenCategory) {
    this.allergenCategoryService.deleteAllergenCategory(allergenCategory.id!).subscribe(
        (data) => {
          let index = this.allergenCategories.indexOf(allergenCategory);
          this.allergenCategories.splice(index,1);
        },
        (error) => {
          this.loggerService.displayError("This category corresponds to several ingredient, you cannot delete it")
        }
    );
  }

  createAllergenCategory(){
    let allergenCategory = new AllergenCategory(this.allergenCategoryFormGroup.get("name")?.value);
    this.allergenCategoryService.createAllergenCategory(allergenCategory).subscribe((data) => {
      this.allergenCategories.push(allergenCategory);
      this.init();
    });
  }

}
