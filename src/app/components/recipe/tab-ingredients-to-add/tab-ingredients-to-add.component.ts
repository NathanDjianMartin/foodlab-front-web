import {Component, OnChanges, Input, OnInit, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {IngredientWithinStep} from "../../../models/ingredient-within-step/ingredient-within-step";
import {IngredientService} from "../../../services/ingredient/ingredient.service";

@Component({
  selector: 'app-tab-ingredients-to-add',
  templateUrl: './tab-ingredients-to-add.component.html',
  styleUrls: ['./tab-ingredients-to-add.component.css']
})
export class TabIngredientsToAddComponent implements OnInit, OnChanges{
  @Output() ingredientsSelectedEvent = new EventEmitter<IngredientWithinStep[]>();
  ingredientsSelected: IngredientWithinStep[] = [];
  @Input() newIngredient!: IngredientWithinStep;
  @Input() ingredientsSelectedInit: IngredientWithinStep[] | undefined;

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
    console.log("ghfdjsk");
    console.log(this.ingredientsSelectedInit);
    if(this.ingredientsSelectedInit){
      for(let ingredient of this.ingredientsSelectedInit) {
        this.ingredientsSelected.push(ingredient);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    for (const changedProp in changes) {
      if(this.ingredientsSelectedInit){
        for(let ingredient of this.ingredientsSelectedInit) {
          this.ingredientsSelected.push(ingredient);
        }
      }
        this.ingredientService.getOne(this.newIngredient.ingredientId).subscribe((ingredient) => {
          this.newIngredient.ingredientDetails = ingredient
          this.ingredientsSelected.push(this.newIngredient);
        });
      }
  }

  validate(){
    this.ingredientsSelectedEvent.emit(this.ingredientsSelected);
  }

  deleteIngredient(ingredient: IngredientWithinStep){
    let index: number = this.ingredientsSelected.indexOf(ingredient);
    if(index != -1) {
      this.ingredientsSelected.splice(index,1);
    }
  }

}
