import {Ingredient} from "../ingredient/ingredient";

export class IngredientWithinStep {
    //attributes in database
    public id?: number;
    public ingredientId: number;
    public recipeExecutionId: number;
    public quantity: number;
    //stored attributes for the front
    public ingredientDetails?: Ingredient;

    constructor(ingredientId: number, quantity: number, recipeExecutionId: number) {
        this.ingredientId = ingredientId;
        this.quantity = quantity;
        this.recipeExecutionId = recipeExecutionId;
    }
}
