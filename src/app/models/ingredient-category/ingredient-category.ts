import {Optional} from "@angular/core";

export class IngredientCategory {
    public id?: number;
    public name: string;

    constructor(name: string) {
        this.name = name;
    }
}
