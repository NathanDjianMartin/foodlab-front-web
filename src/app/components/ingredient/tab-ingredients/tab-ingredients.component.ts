import {Component, OnInit} from '@angular/core';
import {IngredientService} from "../../../services/ingredient/ingredient.service";
import {Ingredient} from "../../../models/ingredient/ingredient";
import {Observable} from "rxjs";
import * as M from 'materialize-css';

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

    ngAfterViewInit() {
        let options = {};
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems, options);
        });
    }

    deleteIngredient(ingredient: Ingredient){
        this.ingredientService.deleteIngredient(ingredient.id!).subscribe();
    }

}
