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
    path: 'ingredients/edit/:id',
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
  },
  {
    path: 'user-creation',
    component: UserCreationComponent
  },
  {
    path: "recipe/details/:id",
    component: RecipeDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
