import {Ingredient} from "../ingredient/ingredient";
import {Optional} from "@angular/core";
import {StepWithinRecipeExecutionService} from "../../services/step-within-recipe-execution/step-within-recipe-execution.service";
import {StepWithinRecipeExecution} from "../step-within-recipe-execution/step-within-recipe-execution";
import {Observable} from "rxjs";

export class RecipeExecution {
    //attributes in database
    public id?: number;
    public isStep: boolean;
    public stepTitle: string;
    public stepDescription?: string;
    public duration?: number;

    //stored attributes for the front
    public ingredients?: Ingredient[];
    public steps?: StepWithinRecipeExecution[];
    //Pour connaitre le numéro de l'étape dans la recette
    //TODO: il faudra surement le placer ailleurs
    public number?: number;

    constructor(isStep: boolean, stepTitle: string, @Optional()stepDescription?: string, @Optional()duration?: number) {
        this.isStep = isStep;
        this.stepTitle = stepTitle;
        this.stepDescription = stepDescription;
        this.duration = duration;
    }


}
