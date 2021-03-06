import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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
import {Recipe} from "../../../models/recipe/recipe";
import {LoggerService} from "../../../services/logger/logger.service";

@Component({
    selector: 'app-add-step-within-recipe-execution',
    templateUrl: './add-step-within-recipe-execution.component.html',
    styleUrls: ['./add-step-within-recipe-execution.component.css']
})
export class AddStepWithinRecipeExecutionComponent implements OnInit, OnChanges {
    @Input() recipeExecutionId!: number;
    recipeExecutionFormGroup!: FormGroup;
    ingredientWithQuantityFormGroup!: FormGroup;
    ingredientsSelected: IngredientWithinStep[] = [];
    ingredients!: Observable<Ingredient[]>
    newIngredient!: IngredientWithinStep;
    unitOfCurrentIngredientSelected: string | undefined;
    @Input() step?: RecipeExecution;
    @Output() isChangeEvent = new EventEmitter<number>();


    constructor(
        private router: Router,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private recipeExecutionService: RecipeExecutionService,
        private recipeService: RecipeService,
        private ingredientService: IngredientService,
        private ingredientWithinStepService: IngredientWithinStepService,
        private stepWithinRecipeExecutionService: StepWithinRecipeExecutionService,
        private loggerService: LoggerService) {
    }

    async ngOnInit() {
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

        await this.initStepForm();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.initStepForm();

    }

    async initStepForm(){

        if(this.step !== undefined){
                this.recipeExecutionFormGroup = this.fb.group({
                    stepTitle: [this.step.stepTitle, [Validators.required]],
                    stepDescription: [this.step.stepDescription, [Validators.required]],
                    duration: [this.step.duration, [Validators.required]]
                })

                await this.ingredientWithinStepService.getAllIngredientsInSimpleStep(this.step!.id!).subscribe( (ingredients) => {

                    this.ingredientsSelected = [];
                    for(let ingredient of ingredients){
                        this.ingredientsSelected.push(ingredient);
                    }
                });

        }
    }

    ingredientSelected(){
        let ingredientId = Number(this.ingredientWithQuantityFormGroup.get("ingredient")?.value)
        this.ingredientService.getOne(ingredientId).subscribe({
            next: ingredient => {
                this.unitOfCurrentIngredientSelected = ingredient.unit;
            }
        });
    }

    addIngredient() {
        if (this.ingredientWithQuantityFormGroup.valid) {
            let newIngredient = new IngredientWithinStep(
                Number(this.ingredientWithQuantityFormGroup.get("ingredient")?.value),
                this.ingredientWithQuantityFormGroup.get("quantity")?.value,
                this.recipeExecutionId!
            );
            this.ingredientService.getOne(newIngredient.ingredientId).subscribe((ingredient) => {
                newIngredient.ingredientDetails = ingredient
                this.ingredientsSelected.push(newIngredient);
            });
            this.ingredientWithQuantityFormGroup.controls['ingredient'].setValue(null);
            this.ingredientWithQuantityFormGroup.controls['quantity'].setValue(null);
            this.unitOfCurrentIngredientSelected = undefined;
        } else {
            this.loggerService.displayError('Please fill in the ingredient with quantity form correctly.')
        }
    }

    deleteIngredient(ingredient: IngredientWithinStep){
        let index: number = this.ingredientsSelected.indexOf(ingredient);
        if(index != -1) {
            this.ingredientsSelected.splice(index,1);
        }
    }

    getStepFromForm(): RecipeExecution {
        return new RecipeExecution(
            true,
            this.recipeExecutionFormGroup.get("stepTitle")?.value,
            this.recipeExecutionFormGroup.get("stepDescription")?.value,
            this.recipeExecutionFormGroup.get("duration")?.value,
        )
    }

    async createStep() {

        if (this.recipeExecutionFormGroup.valid) {
            //En premier on v??rif que la recipeExecution est d??j?? cr????
            if (this.recipeExecutionId == null) {
                //si ??a n'est pas le cas, on en cr??er une
                //on va r??cup??rer les infos de la recette ?? laquelle on ajoute la progression (on va donner le m??me nom qu'a la recette
                if (this.route.snapshot.paramMap.get('id') != undefined) {
                    let id = parseInt(this.route.snapshot.paramMap.get('id')!);
                    this.recipeService.getOneRecipe(id).subscribe(async (r) => {
                        let recipe = r
                        await this.recipeExecutionService.createRecipeExecution(
                            new RecipeExecution(false, recipe.name)).subscribe((progression) => {
                            this.recipeExecutionId = progression.id!;
                            recipe.recipeExecutionId = this.recipeExecutionId;
                            this.recipeService.updateRecipe(recipe).subscribe();
                            this.createSimpleStep();
                        })
                    });
                }
            } else {
                await this.createSimpleStep();
            }
        } else {
            this.loggerService.displayError('Please fill in the step form correctly.')
        }
    }

    async createSimpleStep(){
        //cr??ation de l'??tape
        let steps = this.getStepFromForm();
        //Ajout de l'??tape dans la recette
        await this.recipeExecutionService.createRecipeExecution(steps).subscribe(step => {
            let stepInRecipeExecution = new StepWithinRecipeExecution(step.id!, this.recipeExecutionId);
            this.stepWithinRecipeExecutionService.createStepWithinRecipeExecution(stepInRecipeExecution).subscribe();

            if (this.ingredientsSelected != undefined) {
                this.addAllIngredientsInAStep(step.id!, this.ingredientsSelected);
            }
            window.location.reload();
            //this.loggerService.displaySuccess("Step added");
        });
        this.isChangeEvent.emit(1);
    }

    async addAllIngredientsInAStep(stepId: number, ingredients: IngredientWithinStep[]){
        for (var ingredientInStep of ingredients) {
            let ing = new IngredientWithinStep(ingredientInStep.ingredientId, ingredientInStep.quantity, stepId);
            await this.ingredientWithinStepService.createIngredientWithinStep(ing).subscribe();
        }
    }

    updateStep(){
        let step = this.getStepFromForm();
        step.id = this.step!.id;
        this.recipeExecutionService.updateRecipeExecution(step).subscribe();
        //on supprimer tout les ingr??dients
        this.ingredientWithinStepService.deleteAllIngredientsInAStep(step.id!).subscribe();
        //on recr??er les ingr??dients pour mettre ?? jour la liste
        if (this.ingredientsSelected != undefined) {
            this.addAllIngredientsInAStep(step.id!, this.ingredientsSelected);
        }
        this.isChangeEvent.emit(1);
    }
}
