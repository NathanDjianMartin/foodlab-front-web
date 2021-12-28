import {Component, Input, OnInit} from '@angular/core';
import {Ingredient} from "../../../models/ingredient/ingredient";
import {IngredientService} from "../../../services/ingredient/ingredient.service";
import {RecipeCategory} from "../../../models/recipe-category/recipe-category";
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {Router} from "@angular/router";
import {ErrorService} from "../../../services/error/error.service";

@Component({
  selector: 'app-tab-recipes-by-category',
  templateUrl: './tab-recipes-by-category.component.html',
  styleUrls: ['./tab-recipes-by-category.component.css']
})
export class TabRecipesByCategoryComponent implements OnInit {
  @Input() category!: RecipeCategory;
  recipes!: Recipe[];

  constructor(private recipeService: RecipeService,
              private router: Router,
              private errorService: ErrorService) {
  }


  ngOnInit(): void {
    if(this.category && this.category.id) {
      this.recipeService.getManyByCategory(this.category.id!).subscribe( (recipes) => {
        this.recipes = recipes;
      });
    }
  }

  deleteRecipe(recipe: Recipe){
    this.recipeService.deleteRecipe(recipe.id!).subscribe(
        (data) => {
          this.ngOnInit()
        },
        (error) => {
          //ne s'affiche pas puisque c'est recipe execution qui est present
          this.errorService.displayToats("This recipe is present in other recipes as a sub-recipe, you cannot delete it");
    });
    this.router.navigate(["/recipes",])
  }

  selectRecipe(selectedRecipe: Recipe){
    this.recipeService.selectRecipe(selectedRecipe);
    this.router.navigate(["/recipe/details",selectedRecipe.id])
  }

}
