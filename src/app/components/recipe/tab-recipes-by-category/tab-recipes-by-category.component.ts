import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from "../../../models/ingredient/ingredient";
import {IngredientService} from "../../../services/ingredient/ingredient.service";
import {RecipeCategory} from "../../../models/recipe-category/recipe-category";
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab-recipes-by-category',
  templateUrl: './tab-recipes-by-category.component.html',
  styleUrls: ['./tab-recipes-by-category.component.css']
})
export class TabRecipesByCategoryComponent implements OnInit {
  @Input() category!: RecipeCategory;
  recipes!: Recipe[];

  constructor(private recipeService: RecipeService,
              private router: Router) {
  }


  ngOnInit(): void {
    if(this.category && this.category.id) {
      this.recipeService.getManyByCategory(this.category.id!).subscribe( (recipes) => {
        this.recipes = recipes;
      });
    }
  }

  deleteIngredient(recipe: Recipe){
    this.recipeService.deleteRecipe(recipe.id!).subscribe((data) => {
      this.ngOnInit() });
  }

  selectRecipe(selectedRecipe: Recipe){
    this.recipeService.selectRecipe(selectedRecipe);
    this.router.navigate(["/recipe/details",selectedRecipe.id])
  }

}
