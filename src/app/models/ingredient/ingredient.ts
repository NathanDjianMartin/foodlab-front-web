import {Optional} from "@angular/core";

export class Ingredient {
    public id?: number;
    public name: string;
    public unitaryPrice: number;
    public unit: string;
    public stockQuantity?: number;

    constructor(name: string, unitaryPrice: number, unit: string, @Optional()stockQuantity?: number, @Optional()id?: number) {
        this.id = id;
        this.name = name;
        this.unitaryPrice = unitaryPrice;
        this.unit = unit;
        this.stockQuantity = stockQuantity;
    }
}
