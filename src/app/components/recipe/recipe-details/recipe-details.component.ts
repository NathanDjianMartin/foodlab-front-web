import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeExecution} from "../../../models/recipe-execution/recipe-execution";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  id!: number;
  recipe!: Recipe;
  isAddStepComponentVisible: boolean = false;
  isAddProgressionComponentVisible: boolean = false;
  isStepsOrderManagementComponentVisible: boolean = false;
  isRecipeSaleComponentVisible: boolean = false;
  isCostsComponentVisible: boolean = false;
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
    this.isAddProgressionComponentVisible = false;
    this.isAddStepComponentVisible = false;
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

  toggleAddStep() {
    this.isAddStepComponentVisible = !this.isAddStepComponentVisible;
    this.isAddProgressionComponentVisible = false;
    this.isStepsOrderManagementComponentVisible = false;
    this.isRecipeSaleComponentVisible = false;
    this.isCostsComponentVisible = false;
  }

  toggleAddProgression() {
    this.isAddStepComponentVisible = false;
    this.isAddProgressionComponentVisible = !this.isAddProgressionComponentVisible;
    this.isStepsOrderManagementComponentVisible = false;
    this.isRecipeSaleComponentVisible = false;
    this.isCostsComponentVisible = false;
  }

  toggleStepsOrderManagement() {
    this.isAddStepComponentVisible = false;
    this.isAddProgressionComponentVisible = false;
    this.isStepsOrderManagementComponentVisible = !this.isStepsOrderManagementComponentVisible;
    this.isRecipeSaleComponentVisible = false;
    this.isCostsComponentVisible = false;
  }

  toggleRecipeSale() {
    this.isAddStepComponentVisible = false;
    this.isAddProgressionComponentVisible = false;
    this.isStepsOrderManagementComponentVisible = false;
    this.isRecipeSaleComponentVisible = !this.isRecipeSaleComponentVisible;
    this.isCostsComponentVisible = false;
  }

  toggleCosts() {
    this.isAddStepComponentVisible = false;
    this.isAddProgressionComponentVisible = false;
    this.isStepsOrderManagementComponentVisible = false;
    this.isRecipeSaleComponentVisible = false;
    this.isCostsComponentVisible = !this.isCostsComponentVisible;
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
