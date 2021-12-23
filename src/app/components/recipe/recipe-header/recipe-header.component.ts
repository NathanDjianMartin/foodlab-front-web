import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recipe-header',
  templateUrl: './recipe-header.component.html',
  styleUrls: ['./recipe-header.component.css']
})
export class RecipeHeaderComponent implements OnInit {
  recipe!: Recipe;

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipe = this.recipeService.currentRecipe!;
  }

}
