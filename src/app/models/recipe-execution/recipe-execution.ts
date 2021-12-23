import {Ingredient} from "../ingredient/ingredient";

export class RecipeExecution {
    public id?: number;
    public isStep: boolean;
    public stepTitle: string;
    public stepDescription?: string;
    public duration?: number;
    public ingredients?: Ingredient[];
    public steps?: RecipeExecution[];
    public recipeExecutionId?: number;

    constructor(isStep: boolean, stepTitle: string) {
        this.isStep = isStep;
        this.stepTitle = stepTitle;
    }
}
