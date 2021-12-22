import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TabIngredientsComponent} from "./components/ingredient/tab-ingredients/tab-ingredients.component";
import {IngredientFormComponent} from "./components/ingredient/ingredient-form/ingredient-form.component";
import {TabRecipesComponent} from "./components/recipe/tab-recipes/tab-recipes.component";

const routes: Routes = [
  {
    path: 'ingredients',
    component: TabIngredientsComponent
  },
  {
    path: 'ingredients/add',
    component: IngredientFormComponent
  },
  {
    path: 'recipes',
    component: TabRecipesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
