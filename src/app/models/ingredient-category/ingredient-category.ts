import {Optional} from "@angular/core";

export class IngredientCategory {
    public id?: number;
    public name: string;

    constructor(name: string, @Optional()id?: number) {
        this.id = id;
        this.name = name;
    }
}
