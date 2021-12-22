import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RecipeCategoryService} from "../../../services/recipe-category/recipe-category.service";
import {RecipeCategory} from "../../../models/recipe-category/recipe-category";

@Component({
  selector: 'app-add-recipe-category',
  templateUrl: './add-recipe-category.component.html',
  styleUrls: ['./add-recipe-category.component.css']
})
export class AddRecipeCategoryComponent implements OnInit {
  recipeCategoryFormGroup!: FormGroup;

  constructor(private recipeCategoryService: RecipeCategoryService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.recipeCategoryFormGroup = this.fb.group({
      name:[null,[Validators.required]]
    })
  }

  createRecipeCategory(){
    let recipeCategory = new RecipeCategory(this.recipeCategoryFormGroup.get("name")?.value);
    this.recipeCategoryService.createRecipeCategory(recipeCategory).subscribe( (data) => {
      this.ngOnInit() }
    );
  }


}
