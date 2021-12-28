import { Component, OnInit } from '@angular/core';
import {IngredientCategoryService} from "../../../services/ingredient-category/ingredient-category.service";
import {IngredientCategory} from "../../../models/ingredient-category/ingredient-category";
import {Observable} from "rxjs";

@Component({
  selector: 'app-display-ingredient-stock',
  templateUrl: './display-ingredient-stock.component.html',
  styleUrls: ['./display-ingredient-stock.component.css']
})
export class DisplayIngredientStockComponent implements OnInit {
  categories! : Observable<IngredientCategory[]>;

  constructor(private ingredientCategoryService: IngredientCategoryService) {}

  ngOnInit(): void {
    this.categories = this.ingredientCategoryService.getAllIngredientCategories();
  }

}
