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

  /*ngAfterViewInit(){
    (function ($) {
      $(function () {

        //initialize all modals
        $('.modal').modal();

        //now you can open modal from code
        $('#modal1').modal('open');

        //or by click on trigger
        $('.trigger-modal').modal();

      }); //end of document ready
    })(jQuery); //end of jQuery name space
  }*/

  deleteRecipe(recipe: Recipe){
    this.recipeService.deleteRecipe(recipe.id!).subscribe(
        (data) => {
          this.ngOnInit()
        },
        (error) => {
          this.loggerService.displayError("This recipe is present in other recipes as a sub-recipe, you cannot delete it");
    });
    this.init();
    this.init();
  }

  selectRecipe(selectedRecipe: Recipe){
    this.router.navigate(["/recipe/details",selectedRecipe.id])
  }

  editRecipe(recipeId: number){
    this.router.navigate([`/recipe/edit/${recipeId}`]);
  }

}
