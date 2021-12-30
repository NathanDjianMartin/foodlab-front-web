import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../models/recipe/recipe";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-recipe-header',
  templateUrl: './recipe-header.component.html',
  styleUrls: ['./recipe-header.component.css']
})
export class RecipeHeaderComponent implements OnInit {
  @Input() recipe!: Recipe;
  duration!: number

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipeService.getDuration(this.recipe!.id!).subscribe( (duration) => {
      this.duration = duration;
    });
  }

}
