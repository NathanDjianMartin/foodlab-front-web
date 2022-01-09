import {Component, Input, OnInit} from '@angular/core';
import {IngredientCategory} from "../../../models/ingredient-category/ingredient-category";
import {Ingredient} from "../../../models/ingredient/ingredient";
import {IngredientService} from "../../../services/ingredient/ingredient.service";
import {Router} from "@angular/router";
import {LoggerService} from "../../../services/logger/logger.service";

@Component({
  selector: 'app-ingredient-by-category',
  templateUrl: './ingredient-by-category.component.html',
  styleUrls: ['./ingredient-by-category.component.css']
})
export class IngredientByCategoryComponent implements OnInit {
  @Input() category!: IngredientCategory;
  ingredients!: Ingredient[];
  hasChanged!: boolean;

  constructor(private ingredientService: IngredientService,
              private router: Router,
              private loggerService: LoggerService) {
  }


  ngOnInit(): void {
    this.hasChanged = false;
    if(this.category && this.category.id) {
      this.ingredientService.getManyByCategory(this.category.id!).subscribe( (ingredients) => {
        this.ingredients = ingredients;
      });
    }
  }


  deleteIngredient(ingredient: Ingredient){
    this.ingredientService.deleteIngredient(ingredient.id!).subscribe({
      next: (data) => {
        this.loggerService.displaySuccess(`Ingredient \"${ingredient.name}\" delated!`);
        this.ngOnInit();
      }, error: (err) => {
        this.loggerService.displayError(`Error while deleting ingredient \"${ingredient.name}\": this ingredient is used in different recipes`);
      }
    });
  }

  editIngredient(ingredientId: number | undefined) {
    this.router.navigate([`/ingredients/edit/${ingredientId}`]);
  }
}
