import {Ingredient} from "../ingredient/ingredient";

export class RecipeExecution {
    //attributes in database
    public id?: number;
    public isStep: boolean;
    public stepTitle: string;
    public stepDescription?: string;
    public duration?: number;
    public recipeExecutionId?: number;

    //stored attributes for the front
    public ingredients?: Ingredient[];
    public steps?: RecipeExecution[];

    constructor(isStep: boolean, stepTitle: string) {
        this.isStep = isStep;
        this.stepTitle = stepTitle;
    }
}
