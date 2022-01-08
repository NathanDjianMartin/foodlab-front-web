import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {Observable} from "rxjs";
import {IngredientWithinStepService} from "../../../services/ingredient-within-step/ingredient-within-step.service";
import {IngredientWithinStep} from "../../../models/ingredient-within-step/ingredient-within-step";
import {RecipeExecution} from "../../../models/recipe-execution/recipe-execution";
import {RecipeExecutionService} from "../../../services/recipe-execution/recipe-execution.service";
import {StepWithinRecipeExecutionService} from "../../../services/step-within-recipe-execution/step-within-recipe-execution.service";
import {StepWithinRecipeExecution} from "../../../models/step-within-recipe-execution/step-within-recipe-execution";

@Component({
    selector: 'app-recipe-ingredients-list',
    templateUrl: './recipe-ingredients-list.component.html',
    styleUrls: ['./recipe-ingredients-list.component.css']
})
export class RecipeIngredientsListComponent implements OnChanges {
    @Input() stepId!: number; //RecipeExecutionId
    @Input() stepName!: string;
    @Input() isChange: number = 0;
    ingredientsWithinStep: IngredientWithinStep[] = [];
    step!: RecipeExecution;
    steps!: StepWithinRecipeExecution[];
    progressionWithinStep!: StepWithinRecipeExecution[];

    constructor(private recipeService: RecipeService,
                private ingredientWithinStepService: IngredientWithinStepService,
                private recipeExecutionService: RecipeExecutionService,
                private stepWithinRecipeExecutionService: StepWithinRecipeExecutionService) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        //on regarge les valeurs
        this.init();
        this.init();
    }

    init() {
        if (this.stepId != null) {
            //Récupérer la liste des ingrédients contenu dans la recette (ne prend pas en compte les ingrédients contenu
            // dans une sous recette de la recette puisqu'on appel récursivement le composant avec ses sous recettes
            this.ingredientWithinStepService.getAllIngredientsWithinAStepInSimpleStepsInRecipeExecution(this.stepId!).subscribe((ingredients) => {
                this.ingredientsWithinStep = ingredients;
            });

            //récupérer toutes les progressions contenu dans la recette
            this.stepWithinRecipeExecutionService.getAllProgressionWithinRecipeExecution(this.stepId).subscribe((progressions) => {
                this.progressionWithinStep = progressions;
            })
        }
    }



}
