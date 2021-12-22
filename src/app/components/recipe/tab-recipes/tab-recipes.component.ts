import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";

@Component({
  selector: 'app-tab-recipes',
  templateUrl: './tab-recipes.component.html',
  styleUrls: ['./tab-recipes.component.css']
})
export class TabRecipesComponent implements OnInit {

  recipes!: Observable<Recipe[]>;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getAllRecipes();
  }

  deleteIngredient(recipe: Recipe){
    this.recipeService.deleteRecipe(recipe.id!).subscribe((data) => {
      this.ngOnInit() });
  }

}
