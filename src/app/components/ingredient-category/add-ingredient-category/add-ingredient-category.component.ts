import { Component, OnInit } from '@angular/core';
import {IngredientCategory} from "../../../models/ingredient-category/ingredient-category";
import {IngredientCategoryService} from "../../../services/ingredient-category/ingredient-category.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-ingredient-category',
  templateUrl: './add-ingredient-category.component.html',
  styleUrls: ['./add-ingredient-category.component.css']
})
export class AddIngredientCategoryComponent implements OnInit {
  ingredientCategoryFormGroup!: FormGroup;

  constructor(private ingredientCategoryService: IngredientCategoryService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ingredientCategoryFormGroup = this.fb.group({
      name:[null,[Validators.required]]
    })
  }

  createIngredientCategory(){
    let ingredientCategory = new IngredientCategory(this.ingredientCategoryFormGroup.get("name")?.value);
    this.ingredientCategoryService.createIngredientCategory(ingredientCategory).subscribe( (data) => {
        this.ngOnInit() }
    );
  }

}
