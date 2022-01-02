import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from "../../../models/ingredient/ingredient";
import {IngredientService} from "../../../services/ingredient/ingredient.service";
import {Observable} from "rxjs";
import {IngredientCategory} from "../../../models/ingredient-category/ingredient-category";

@Component({
  selector: 'app-ingredient-stock-by-category',
  templateUrl: './ingredient-stock-by-category.component.html',
  styleUrls: ['./ingredient-stock-by-category.component.css']
})
export class IngredientStockByCategoryComponent implements OnInit {
  @Input() category!: IngredientCategory;
  ingredients!: Ingredient[];
  hasChanged!: boolean;

  constructor(private ingredientService: IngredientService) {
  }


  ngOnInit(): void {
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
    //TODO: pour essayer que les données recharge mieux remettre observable et recharger le tableau
    for(let ingredient of this.ingredients){
      this.ingredientService.updateStockQuantityIngredient(ingredient).subscribe();
    }
    this.ngOnInit();
  }

}
