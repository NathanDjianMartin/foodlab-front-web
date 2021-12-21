import { Component, OnInit } from '@angular/core';
import { IngredientService } from "../../../services/ingredient/ingredient.service";
import { Ingredient } from "../../../models/ingredient/ingredient";
import { Observable } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-tab-ingredients',
  templateUrl: './tab-ingredients.component.html',
  styleUrls: ['./tab-ingredients.component.css']
})
export class TabIngredientsComponent implements OnInit {
  ingredients!: Observable<Ingredient[]>;
  ingredientFormGroup!: FormGroup;

  constructor(
      private ingredientService: IngredientService,
      private fb: FormBuilder
              ) { }

  ngOnInit(): void {
    this.ingredients = this.ingredientService.getAllIngredients();

    this.ingredientFormGroup = this.fb.group({
      name:[null, [Validators.required]],
      unitaryPrice:[null, [Validators.required]],
      unit:[null,[Validators.required]]});
  }

  createIngredient(){
    if(this.ingredientFormGroup.valid){
      let ingredient = new Ingredient(this.ingredientFormGroup.get("name")?.value,this.ingredientFormGroup.get("unitaryPrice")?.value,this.ingredientFormGroup.get("unit")?.value);
      this.ingredientService.createIngredient(ingredient).subscribe(ingredient => console.log("ingredient crée bb t'es beau gggggg"));
    }
  }

}
