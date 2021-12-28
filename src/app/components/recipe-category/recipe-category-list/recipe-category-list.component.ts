import { Component, OnInit } from '@angular/core';
import {RecipeCategory} from "../../../models/recipe-category/recipe-category";
import {RecipeCategoryService} from "../../../services/recipe-category/recipe-category.service";
import {Observable} from "rxjs";
import {LoggerService} from "../../../services/logger/logger.service";

@Component({
  selector: 'app-recipe-category-list',
  templateUrl: './recipe-category-list.component.html',
  styleUrls: ['./recipe-category-list.component.css']
})
export class RecipeCategoryListComponent implements OnInit {
  recipeCategories!: Observable<RecipeCategory[]>;

  constructor(private recipeCategoryService: RecipeCategoryService,
              private loggerService: LoggerService) {
  }

  ngOnInit(): void {
    this.recipeCategories = this.recipeCategoryService.getAllRecipeCategories();
  }

  deleteRecipeCategory(ingredientCategory: RecipeCategory) {
    this.recipeCategoryService.deleteRecipeCategory(ingredientCategory.id!).subscribe(
        (data) => {
          this.ngOnInit()
        },
        (error) => {
          this.loggerService.displayError("This category corresponds to several recipes, you cannot delete it")
          console.log("oups")
        }
    );
  }
}
