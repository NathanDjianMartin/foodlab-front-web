import {RecipeExecution} from "../recipe-execution/recipe-execution";

export class Recipe {
    public id?: number;
    public name: string;
    public author: string;
    public guestsNumber: number;
    public recipeCategory: number;
    public recipeCategoryName?: string;
    public recipeExecutionId?: number;

    //TODO: ajouter attribut recipeExecution et costData

    constructor(name: string, author: string, guestsNumber: number, recipeCategory: number) {
        this.name = name;
        this.author = author;
        this.guestsNumber = guestsNumber;
        this.recipeCategory = recipeCategory;
    }
}
