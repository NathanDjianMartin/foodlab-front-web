import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {RecipeCategory} from "../../../models/recipe-category/recipe-category";
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {Router} from "@angular/router";
import {LoggerService} from "../../../services/logger/logger.service";

@Component({
  selector: 'app-tab-recipes-by-category',
  templateUrl: './tab-recipes-by-category.component.html',
  styleUrls: ['./tab-recipes-by-category.component.css']
})
export class TabRecipesByCategoryComponent implements OnInit{
  @Input() category!: RecipeCategory;
  recipes!: Recipe[];

  constructor(private recipeService: RecipeService,
              private router: Router,
              private loggerService: LoggerService) {
  }


  ngOnInit(): void {
    this.init();
  }

  init(){
    if(this.category && this.category.id) {
      this.recipeService.getManyByCategory(this.category.id!).subscribe( (recipes) => {
        this.recipes = recipes;
      });
    }
  }

  deleteRecipe(recipe: Recipe){
    this.recipeService.deleteRecipe(recipe.id!).subscribe(
        (data) => {
          this.loggerService.displaySuccess("Recipe deleted!");
          this.init();
          this.init();
        },
        (error) => {
          this.loggerService.displayError("This recipe is present in other recipes as a sub-recipe, you cannot delete it");
    });
  }

  selectRecipe(selectedRecipe: Recipe){
    this.router.navigate(["/recipe/details",selectedRecipe.id])
  }

  editRecipe(recipeId: number){
    console.log("Edit recipe")
    this.router.navigate([`/recipe/edit/${recipeId}`]);
  }

}
