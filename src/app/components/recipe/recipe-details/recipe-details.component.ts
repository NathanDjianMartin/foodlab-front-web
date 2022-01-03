import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {ActivatedRoute} from "@angular/router";
import {IngredientWithinStep} from "../../../models/ingredient-within-step/ingredient-within-step";
import {RecipeExecution} from "../../../models/recipe-execution/recipe-execution";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  id!: number;
  recipe!: Recipe;
  addAStep: boolean = false;
  addAProgression: boolean = false;
  isChange: number = 0;
  stepToUpdate!: RecipeExecution;

  constructor(private route: ActivatedRoute,
      private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    if(this.route.snapshot.paramMap.get('id') != undefined) {
      this.id = parseInt(this.route.snapshot.paramMap.get('id')!);
      this.recipeService.getOneRecipe(this.id).subscribe( (recipe) => {
        this.recipe = recipe
      });
    }

  }

  changeDetected($event: number) {
    console.log("change detected ok in parent")
    this.isChange = this.isChange + $event;
  }

  stepToUpdateDetected($event: RecipeExecution){
    this.stepToUpdate = $event;
  }

  addAStepAction(){
    this.addAStep = true;
    this.addAProgression = false;
  }

  addAProgressionAction(){
    this.addAStep = false;
    this.addAProgression = true;
  }
}
