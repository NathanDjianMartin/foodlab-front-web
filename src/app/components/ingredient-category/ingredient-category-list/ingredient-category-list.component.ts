import {Component, OnInit} from '@angular/core';
import {IngredientCategory} from "../../../models/ingredient-category/ingredient-category";
import {IngredientCategoryService} from "../../../services/ingredient-category/ingredient-category.service";
import {Observable} from "rxjs";
import {LoggerService} from "../../../services/logger/logger.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-ingredient-category-list',
    templateUrl: './ingredient-category-list.component.html',
    styleUrls: ['./ingredient-category-list.component.css']
})
export class IngredientCategoryListComponent implements OnInit {
    ingredientCategories!: Observable<IngredientCategory[]>;
    ingredientCategoryFormGroup!: FormGroup;

    constructor(private ingredientCategoryService: IngredientCategoryService,
                private loggerService: LoggerService,
                private fb: FormBuilder) {
    }

    ngOnInit(): void {
        this.init();
    }

    init(){
        this.ingredientCategoryFormGroup = this.fb.group({
            name:[null,[Validators.required]]
        })
        this.ingredientCategories = this.ingredientCategoryService.getAllIngredientCategories();
    }

    deleteIngredientCategory(ingredientCategory: IngredientCategory) {
        this.ingredientCategoryService.deleteIngredientCategory(ingredientCategory.id!).subscribe(
            (data) => {
                this.ngOnInit()
            },
            (error) => {
                this.loggerService.displayError("This category corresponds to several ingredient, you cannot delete it")
            }
        );
    }

    createIngredientCategory(){
        let ingredientCategory = new IngredientCategory(this.ingredientCategoryFormGroup.get("name")?.value);
        this.ingredientCategoryService.createIngredientCategory(ingredientCategory).subscribe( (data) => {
            this.ngOnInit() }
        );
    }

}
