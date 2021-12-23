export class StepWithinRecipeExecution {
    public id?: number;
    public stepId: number;
    public recipeExecutionId: number;
    public number: number;

    constructor(stepId: number, recipeExecutionId: number, number: number) {
        this.stepId = stepId;
        this.recipeExecutionId = recipeExecutionId;
        this.number = number;
    }
}
