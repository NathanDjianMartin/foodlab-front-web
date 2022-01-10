import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from "../../../models/ingredient/ingredient";
import {IngredientService} from "../../../services/ingredient/ingredient.service";
import {Observable} from "rxjs";
import {IngredientCategory} from "../../../models/ingredient-category/ingredient-category";
import {LoggerService} from "../../../services/logger/logger.service";

@Component({
  selector: 'app-ingredient-stock-by-category',
  templateUrl: './ingredient-stock-by-category.component.html',
  styleUrls: ['./ingredient-stock-by-category.component.css']
})
export class IngredientStockByCategoryComponent implements OnInit {
  @Input() category!: IngredientCategory;
  ingredients!: Ingredient[];
  hasChanged!: boolean;

  constructor(private ingredientService: IngredientService,
              private loggerService: LoggerService) {
  }


  ngOnInit(): void {
    this.init();
  }

  init(){
    this.hasChanged = false;
    if(this.category && this.category.id) {
      this.ingredientService.getManyByCategory(this.category.id!).subscribe( (ingredients) => {
        this.ingredients = ingredients;
      });
    }
  }

  increase(ingredient: Ingredient){
    ingredient.stockQuantity = Number(ingredient.stockQuantity) + 1;
    this.hasChanged = true;
  }

  decrease(ingredient: Ingredient){
    ingredient.stockQuantity = ingredient.stockQuantity - 1;
    this.hasChanged = true;
  }

  updateQuantityInStock(){
    let isUpdated = true;
    for(let ingredient of this.ingredients){
      this.ingredientService.updateStockQuantityIngredient(ingredient).subscribe({
        next: (data) => {

        }, error: (error) => {
          isUpdated = false;
      }
      });
    }
    if(isUpdated){
      this.loggerService.displaySuccess("Stock updated!");
      this.init();
      this.init();
    }else{
      this.loggerService.displayError("Error in updating stock!");
    }
  }

}
