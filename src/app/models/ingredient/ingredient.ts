import {Optional} from "@angular/core";

export class Ingredient {
    public id?: number;
    public name: string;
    public unitaryPrice: number;
    public unit: string;
    public stockQuantity: number;
    public allergenCategory?: number;
    public ingredientCategory: number;

    constructor(name: string, unitaryPrice: number, unit: string, stockQuantity: number, ingredientCategory: number) {
        this.name = name;
        this.unitaryPrice = unitaryPrice;
        this.unit = unit;
        this.stockQuantity = stockQuantity;
        this.ingredientCategory = ingredientCategory;
    }

}
