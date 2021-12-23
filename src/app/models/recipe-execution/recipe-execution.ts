import {Ingredient} from "../ingredient/ingredient";

export class RecipeExecution {
    public id?: number;
    public isStep: boolean;
    public stepTitle: string;
    public stepDescription?: string;
    public duration?: number;
    public ingredients?: Ingredient[];
    public recipeExecution?: RecipeExecution;

    constructor(isStep: boolean, stepTitle: string) {
        this.isStep = isStep;
        this.stepTitle = stepTitle;
    }
}
