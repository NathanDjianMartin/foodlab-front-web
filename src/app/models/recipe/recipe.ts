import {RecipeExecution} from "../recipe-execution/recipe-execution";
import {Ingredient} from "../ingredient/ingredient";

export class Recipe {

    //attributes in database:
    public id?: number;
    public name: string;
    public author: string;
    public guestsNumber: number;
    public recipeCategory: number;
    public recipeExecutionId?: number;
    public costDataId!: number;

    //stored attributes for the front
    public recipeCategoryName?: string;
    public steps?: RecipeExecution[];
    public ingredient?: Ingredient[];


    constructor(name: string, author: string, guestsNumber: number, recipeCategory: number) {
        this.name = name;
        this.author = author;
        this.guestsNumber = guestsNumber;
        this.recipeCategory = recipeCategory;
    }
}
