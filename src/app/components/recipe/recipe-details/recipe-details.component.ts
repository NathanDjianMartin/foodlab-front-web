import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {ActivatedRoute} from "@angular/router";

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

  addAStepAction(){
    this.addAStep = true;
    this.addAProgression = false;
  }

  addAProgressionAction(){
    this.addAStep = false;
    this.addAProgression = true;
  }
}
