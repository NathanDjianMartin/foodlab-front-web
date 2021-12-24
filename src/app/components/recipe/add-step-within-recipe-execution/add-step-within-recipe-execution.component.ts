import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RecipeExecutionService} from "../../../services/recipe-execution/recipe-execution.service";
import {Ingredient} from "../../../models/ingredient/ingredient";
import {IngredientService} from "../../../services/ingredient/ingredient.service";
import {Observable} from "rxjs";
import {IngredientWithinStep} from "../../../models/ingredient-within-step/ingredient-within-step";
import {RecipeExecution} from "../../../models/recipe-execution/recipe-execution";

@Component({
  selector: 'app-add-step-within-recipe-execution',
  templateUrl: './add-step-within-recipe-execution.component.html',
  styleUrls: ['./add-step-within-recipe-execution.component.css']
})
export class AddStepWithinRecipeExecutionComponent implements OnInit {
  @Input() recipeExecutionId!: number;
  recipeExecutionFormGroup!:FormGroup;
  ingredientWithQuantityFormGroup!: FormGroup;
  ingredientsSelected!: IngredientWithinStep[];
  ingredients!: Observable<Ingredient[]>

  constructor(private fb: FormBuilder,
              private recipeExecutionService: RecipeExecutionService,
              private ingredientService: IngredientService) { }

  ngOnInit(): void {
    this.ingredients = this.ingredientService.getAllIngredients()
    this.recipeExecutionFormGroup = this.fb.group({
      stepTitle: [null, [Validators.required]],
      stepDescription: [null, [Validators.required]]
    });
    this.ingredientWithQuantityFormGroup = this.fb.group({
      ingredient: [null, [Validators.required]],
      quantity: [null, [Validators.required]]
    })
  }

  addIngredient() {
    let newIngredient = new IngredientWithinStep(
        this.ingredientWithQuantityFormGroup.get("ingredient")?.value,
        this.ingredientWithQuantityFormGroup.get("quantity")?.value,
        this.recipeExecutionId!
    );
    this.ingredientService.getOne(newIngredient.ingredientId).subscribe( (ingredient) => {
      newIngredient.ingredientDetails = ingredient
    });
    this.ingredientsSelected.push(newIngredient);
  }

  createStep(){

  }

}
