import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {RecipeCategoryService} from "../../../services/recipe-category/recipe-category.service";
import {RecipeCategory} from "../../../models/recipe-category/recipe-category";

@Component({
  selector: 'app-display-recipes',
  templateUrl: './display-recipes.component.html',
  styleUrls: ['./display-recipes.component.css']
})
export class DisplayRecipesComponent implements OnInit {
  categories! : Observable<RecipeCategory[]>;

  constructor(private recipeCategoryService: RecipeCategoryService) {}

  ngOnInit(): void {
    this.categories = this.recipeCategoryService.getAllRecipeCategories();
  }
}
