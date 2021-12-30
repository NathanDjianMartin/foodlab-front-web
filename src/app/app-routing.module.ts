import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TabIngredientsComponent} from "./components/ingredient/tab-ingredients/tab-ingredients.component";
import {IngredientFormComponent} from "./components/ingredient/ingredient-form/ingredient-form.component";
import {TabRecipesComponent} from "./components/recipe/tab-recipes/tab-recipes.component";
import {RecipeFormComponent} from "./components/recipe/recipe-form/recipe-form.component";
import {RecipeDetailsComponent} from "./components/recipe/recipe-details/recipe-details.component";
import {LoginComponent} from "./components/user/login/login.component";
import {ProfileComponent} from "./components/user/profile/profile.component";
import {AuthenticatedGuardGuard} from "./guards/authenticated/authenticated-guard.guard";
import {UserCreationComponent} from "./components/user/user-creation/user-creation.component";
import {DisplayIngredientStockComponent} from "./components/ingredient/display-ingredient-stock/display-ingredient-stock.component";
import {DisplayRecipesComponent} from "./components/recipe/display-recipes/display-recipes.component";
import {DisplayIngredientComponent} from "./components/ingredient/display-ingredient/display-ingredient.component";

const routes: Routes = [
  {
    path: 'ingredients',
    component: DisplayIngredientComponent
  },
  {
    path: 'ingredients/add',
    component: IngredientFormComponent
  },
  {
    path: 'ingredients/edit/:id',
    component: IngredientFormComponent
  },
  {
    path: 'recipes',
    component: DisplayRecipesComponent
  },
  {
    path: 'recipes/add',
    component: RecipeFormComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticatedGuardGuard]
  },
  {
    path: 'user-creation',
    component: UserCreationComponent
  },
  {
    path: "recipe/details/:id",
    component: RecipeDetailsComponent
  },
  {
    path: "stock",
    component: DisplayIngredientStockComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
