import {Component, OnInit} from '@angular/core';
import {IngredientService} from "../../../services/ingredient/ingredient.service";
import {Ingredient} from "../../../models/ingredient/ingredient";
import {Observable} from "rxjs";

@Component({
    selector: 'app-tab-ingredients',
    templateUrl: './tab-ingredients.component.html',
    styleUrls: ['./tab-ingredients.component.css']
})
export class TabIngredientsComponent implements OnInit {
    ingredients!: Observable<Ingredient[]>;

    constructor(private ingredientService: IngredientService) {
    }


    ngOnInit(): void {
        this.ingredients = this.ingredientService.getAllIngredients();
    }

}
