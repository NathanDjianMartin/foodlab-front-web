import {Optional} from "@angular/core";

export class Ingredient {
    //attributes in database
    public id?: number;
    public name: string;
    public unitaryPrice: number;
    public unit: string;
    public stockQuantity: number;
    public allergenCategory?: number;
    public ingredientCategoryId: number;

    //stored attributes for the front
    public ingredientCategoryName?: string;

    constructor(name: string, unitaryPrice: number, unit: string, stockQuantity: number, ingredientCategory: number) {
        this.name = name;
        this.unitaryPrice = unitaryPrice;
        this.unit = unit;
        this.stockQuantity = stockQuantity;
        this.ingredientCategoryId = ingredientCategory;
    }

}
