import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TabIngredientsComponent} from "./components/ingredient/tab-ingredients/tab-ingredients.component";
import {IngredientFormComponent} from "./components/ingredient/ingredient-form/ingredient-form.component";
import {TabRecipesComponent} from "./components/recipe/tab-recipes/tab-recipes.component";
import {RecipeFormComponent} from "./components/recipe/recipe-form/recipe-form.component";
import {LoginComponent} from "./components/user/login/login.component";
import {ProfileComponent} from "./components/user/profile/profile.component";
import {AuthenticatedGuardGuard} from "./guards/authenticated/authenticated-guard.guard";

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
