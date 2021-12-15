import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Recipe} from "../../models/recipe";

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css']
})
export class RecipeCardComponent {
  recipes: Recipe[] = [
    {id: 1, title: 'Hydrogen', duration: 20, nbOfGuest: 3},
    {id: 2, title: 'Helium', duration: 30, nbOfGuest: 4},
    {id: 3, title: 'Lithium', duration: 60,  nbOfGuest: 6},
    {id: 4, title: 'Beryllium', duration: 25, nbOfGuest: 9},
    {id: 5, title: 'Boron', duration: 30, nbOfGuest: 2},
  ];

  @Output() festivalSelected = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {

  }

  onSelect(recipe: Recipe){
    this.festivalSelected.emit(recipe);

  }


}
