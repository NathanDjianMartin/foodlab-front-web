import {RecipeExecution} from "../recipe-execution/recipe-execution";
import {Optional} from "@angular/core";

export class StepWithinRecipeExecution {
    //attributes in database
    public id?: number;
    public stepId: number;
    public recipeExecutionId: number;
    public number: number;

    //attributes stored for the frond
    public step?: RecipeExecution;

    constructor(stepId: number, recipeExecutionId: number, number: number) {
        this.stepId = stepId;
        this.recipeExecutionId = recipeExecutionId;
        this.number = number;
    }
}
