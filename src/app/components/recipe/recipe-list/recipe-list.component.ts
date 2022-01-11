import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {LoggerService} from "../../../services/logger/logger.service";
import {Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Input() title: string = 'Recipe list';
  @Input() recipeList: Recipe[] = [];

  constructor(
      private recipeService: RecipeService,
      private loggerService: LoggerService,
      private userService: UserService,
      private router: Router
  ) { }

  ngOnInit(): void {
  }

  deleteRecipe(recipe: Recipe){
    this.recipeService.deleteRecipe(recipe.id!).subscribe(
        (data) => {
          this.ngOnInit()
        },
        (error) => {
          //ne s'affiche pas puisque c'est recipe execution qui est present
          this.loggerService.displayError("This recipe is present in other recipes as a sub-recipe, you cannot delete it");
        });
    this.router.navigate(["/recipes",])
  }

  selectRecipe(selectedRecipe: Recipe){
    this.router.navigate(["/recipe/details",selectedRecipe.id])
  }

  editRecipe(recipeId: number){
    console.log("Edit recipe")
    this.router.navigate([`/recipe/edit/${recipeId}`]);
  }
}
