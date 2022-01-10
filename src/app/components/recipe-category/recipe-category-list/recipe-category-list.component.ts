import { Component, OnInit } from '@angular/core';
import {RecipeCategory} from "../../../models/recipe-category/recipe-category";
import {RecipeCategoryService} from "../../../services/recipe-category/recipe-category.service";
import {Observable} from "rxjs";
import {LoggerService} from "../../../services/logger/logger.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-recipe-category-list',
  templateUrl: './recipe-category-list.component.html',
  styleUrls: ['./recipe-category-list.component.css']
})
export class RecipeCategoryListComponent implements OnInit {
  recipeCategories!: Observable<RecipeCategory[]>;
  recipeCategoryFormGroup!: FormGroup;

  constructor(private recipeCategoryService: RecipeCategoryService,
              private loggerService: LoggerService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.init();
  }

  init(){
    this.recipeCategoryFormGroup = this.fb.group({
      name:[null,[Validators.required]]
    })
    this.recipeCategories = this.recipeCategoryService.getAllRecipeCategories();
  }

  deleteRecipeCategory(ingredientCategory: RecipeCategory) {
    this.recipeCategoryService.deleteRecipeCategory(ingredientCategory.id!).subscribe(
        (data) => {
          this.init()
        },
        (error) => {
          this.loggerService.displayError("This category corresponds to several recipes, you cannot delete it")
          console.log("oups")
        }
    );
  }

  createRecipeCategory(){
    let recipeCategory = new RecipeCategory(this.recipeCategoryFormGroup.get("name")?.value);
    this.recipeCategoryService.createRecipeCategory(recipeCategory).subscribe( (data) => {
      this.init() }
    );
  }
}
