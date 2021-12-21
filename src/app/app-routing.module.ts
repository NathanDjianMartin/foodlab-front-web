import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TabIngredientsComponent} from "./components/ingredient/tab-ingredients/tab-ingredients.component";
import {IngredientFormComponent} from "./components/ingredient/ingredient-form/ingredient-form.component";

const routes: Routes = [
  {
    path: 'ingredients',
    component: TabIngredientsComponent
  },
  {
    path: 'ingredients/add',
    component: IngredientFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
