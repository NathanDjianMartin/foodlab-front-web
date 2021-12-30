import {Component, OnInit} from '@angular/core';
import {IngredientCategory} from "../../../models/ingredient-category/ingredient-category";
import {IngredientCategoryService} from "../../../services/ingredient-category/ingredient-category.service";
import {Observable} from "rxjs";
import {LoggerService} from "../../../services/logger/logger.service";

@Component({
    selector: 'app-ingredient-category-list',
    templateUrl: './ingredient-category-list.component.html',
    styleUrls: ['./ingredient-category-list.component.css']
})
export class IngredientCategoryListComponent implements OnInit {
    ingredientCategories!: Observable<IngredientCategory[]>;

    constructor(private ingredientCategoryService: IngredientCategoryService,
                private loggerService: LoggerService) {
    }

    ngOnInit(): void {
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

}
