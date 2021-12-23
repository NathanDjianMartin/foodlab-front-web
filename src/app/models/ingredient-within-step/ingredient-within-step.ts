import {Ingredient} from "../ingredient/ingredient";

export class IngredientWithinStep {
    public id?: number;
    public ingredientId: number;
    public recipeExecutionId?: number;
    public quantity: number;
    public ingredientDetails?: Ingredient;

    constructor(ingredientId: number, quantity: number) {
        this.ingredientId = ingredientId;
        this.quantity = quantity;
    }
}
