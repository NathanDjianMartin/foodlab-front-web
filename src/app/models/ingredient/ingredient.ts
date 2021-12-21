import {Optional} from "@angular/core";

export class Ingredient {
    public id?: number;
    public name: string;
    public unitaryPrice: number;
    public unit: string;
    public stockQuantity: number;
    public allergenCategoryId?: number;
    public ingredientCategoryId: number;

    constructor(name: string, unitaryPrice: number, unit: string, stockQuantity: number, ingredientCategoryId: number, @Optional() allergenCategoryId?: number, @Optional()id?: number) {
        this.id = id;
        this.name = name;
        this.unitaryPrice = unitaryPrice;
        this.unit = unit;
        this.stockQuantity = stockQuantity;
        this.allergenCategoryId = allergenCategoryId;
        this.ingredientCategoryId = ingredientCategoryId;
    }
}
