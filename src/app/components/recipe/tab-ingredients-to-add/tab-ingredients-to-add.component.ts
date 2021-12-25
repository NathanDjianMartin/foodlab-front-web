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

  constructor(private ingredientService: IngredientService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("j'ai vu le changelent" + changes);
    for (const changedProp in changes) {
      console.log(changedProp);
      this.ingredientService.getOne(this.newIngredient.ingredientId).subscribe( (ingredient) => {
        this.newIngredient.ingredientDetails = ingredient
        this.ingredientsSelected.push(this.newIngredient);
      });
    }
  }

  validate(){
    this.ingredientsSelectedEvent.emit(this.ingredientsSelected);
  }

}
