import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
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
  manageOrderSteps: boolean = false;
  isChange: number = 0;
  stepToUpdate: RecipeExecution | undefined;


  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
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
    this.addAProgression = false;
    this.addAStep = false;
    this.stepToUpdate = undefined;
  }

  stepToUpdateDetected($event: RecipeExecution){
    this.stepToUpdate = $event;
    console.log("jj")
    this.router.navigate(["recipe/details/" + this.recipe!.id!], { fragment: 'editstep'}).then( (data) => {
      console.log("recipe/details/" + this.recipe!.id! + "#editstep");
    }, (error) => {
      console.log(error);
    });
  }

  addAStepAction(){
    this.addAStep = !this.addAStep;
    this.addAProgression = false;
  }

  addAProgressionAction(){
    this.addAStep = false;
    this.addAProgression = !this.addAProgression;
    this.manageOrderSteps = false;
  }

  manageOrderStepsAction(){
    this.manageOrderSteps =!this.manageOrderSteps;
    this.addAStep = false;
    this.addAProgression = false;
  }

  printAction() {
    window.print();
  }

  printWithoutCostsAction() {
    let displayCostElement = document.getElementById('display-cost');
    if (displayCostElement != null) {
      displayCostElement.classList.add('print-exclude');
    }
    window.print();
    if (displayCostElement != null) {
      displayCostElement.classList.remove('print-exclude');
    }
  }
}
