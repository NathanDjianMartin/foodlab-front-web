import { Component, OnInit } from '@angular/core';
import {IngredientCategory} from "../../../models/ingredient-category/ingredient-category";
import {IngredientCategoryService} from "../../../services/ingredient-category/ingredient-category.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-display-ingredient',
  templateUrl: './display-ingredient.component.html',
  styleUrls: ['./display-ingredient.component.css']
})
export class DisplayIngredientComponent implements OnInit {
  categories! : Observable<IngredientCategory[]>;
  displayStock!: boolean;

  constructor(private ingredientCategoryService: IngredientCategoryService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.categories = this.ingredientCategoryService.getAllIngredientCategories();
    this.route.url.subscribe( (url) => {
      if(url.toString() == "stock") {
        console.log(url.toString());
        this.displayStock = true;
      }
    });
  }

}
