import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RecipeExecutionService} from "../../../services/recipe-execution/recipe-execution.service";
import {Ingredient} from "../../../models/ingredient/ingredient";
import {IngredientService} from "../../../services/ingredient/ingredient.service";
import {Observable} from "rxjs";
import {IngredientWithinStep} from "../../../models/ingredient-within-step/ingredient-within-step";
import {RecipeExecution} from "../../../models/recipe-execution/recipe-execution";
import {IngredientWithinStepService} from "../../../services/ingredient-within-step/ingredient-within-step.service";
import {StepWithinRecipeExecution} from "../../../models/step-within-recipe-execution/step-within-recipe-execution";
import {StepWithinRecipeExecutionService} from "../../../services/step-within-recipe-execution/step-within-recipe-execution.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../../../services/recipe/recipe.service";

@Component({
    selector: 'app-add-step-within-recipe-execution',
    templateUrl: './add-step-within-recipe-execution.component.html',
    styleUrls: ['./add-step-within-recipe-execution.component.css']
})
export class AddStepWithinRecipeExecutionComponent implements OnInit {
    @Input() recipeExecutionId!: number;
    recipeExecutionFormGroup!: FormGroup;
    ingredientWithQuantityFormGroup!: FormGroup;
    ingredientsSelected!: IngredientWithinStep[];
    ingredients!: Observable<Ingredient[]>
    newIngredient!: IngredientWithinStep;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private recipeExecutionService: RecipeExecutionService,
        private recipeService: RecipeService,
        private ingredientService: IngredientService,
        private ingredientWithinStepService: IngredientWithinStepService,
        private stepWithinRecipeExecutionService: StepWithinRecipeExecutionService) {
    }

    ngOnInit(): void {
        this.ingredients = this.ingredientService.getAllIngredients()
        this.recipeExecutionFormGroup = this.fb.group({
            stepTitle: [null, [Validators.required]],
            stepDescription: [null, [Validators.required]],
            duration: [null, [Validators.required]]
        });
        this.ingredientWithQuantityFormGroup = this.fb.group({
            ingredient: [null, [Validators.required]],
            quantity: [null, [Validators.required]]
        })
    }

    addIngredient() {
        this.newIngredient = new IngredientWithinStep(
            Number(this.ingredientWithQuantityFormGroup.get("ingredient")?.value),
            this.ingredientWithQuantityFormGroup.get("quantity")?.value,
            this.recipeExecutionId!
        );
        this.ngOnInit()
    }

    changeIngredientsSelected($event: IngredientWithinStep[]) {
        this.ingredientsSelected = $event;
    }

    async createStep() {
        //En premier on vérif que la recipeExecution est déjà créé
        if(this.recipeExecutionId == null){
            //si ça n'est pas le cas, on en créer une
            //on va récupérer les infos de la recette à laquelle on ajoute la progression (on va donner le même nom qu'a la recette
            if(this.route.snapshot.paramMap.get('id') != undefined) {
                let id = parseInt(this.route.snapshot.paramMap.get('id')!);
                this.recipeService.getOneRecipe(id).subscribe( (r) => {
                    let recipe = r
                    this.recipeExecutionService.createRecipeExecution(
                        new RecipeExecution(false, recipe.name)).subscribe( (progression) => {
                            this.recipeExecutionId = progression.id!;
                            recipe.recipeExecutionId = this.recipeExecutionId;
                            this.recipeService.updateRecipe(recipe).subscribe();
                    })
                });
            }
        }
        //TODO: peut être mieux mettre toutes les étapes dans le service
        //création de l'étape
        let steps = new RecipeExecution(
            true,
            this.recipeExecutionFormGroup.get("stepTitle")?.value,
            this.recipeExecutionFormGroup.get("stepDescription")?.value,
            this.recipeExecutionFormGroup.get("duration")?.value,
        )
        //Ajout de l'étape dans la recette
        this.recipeExecutionService.createRecipeExecution(steps).subscribe(step => {
            let stepInRecipeExecution = new StepWithinRecipeExecution(step.id!, this.recipeExecutionId, 1);
            this.stepWithinRecipeExecutionService.createStepWithinRecipeExecution(stepInRecipeExecution).subscribe();

            if (this.ingredientsSelected != undefined) {
                for (var ingredientInStep of this.ingredientsSelected!) {
                    let ing = new IngredientWithinStep(ingredientInStep.ingredientId, ingredientInStep.quantity, step.id!);
                    this.ingredientWithinStepService.createIngredientWithinStep(ing).subscribe();
                }
            }
        });
        //TODO: vérifier que tout est ok
        this.router.navigate([this.router.url]);
    }
}
