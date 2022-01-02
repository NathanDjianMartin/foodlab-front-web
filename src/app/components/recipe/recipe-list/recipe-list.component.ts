import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../models/recipe/recipe";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Input() title: string = 'Recipe list';
  @Input() recipeList: Recipe[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  selectRecipe(recipe: Recipe): void {

  }

  deleteRecipe(recipe: Recipe): void {

  }
}
