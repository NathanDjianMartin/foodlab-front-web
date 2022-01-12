import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IngredientFormComponent} from "./components/ingredient/ingredient-form/ingredient-form.component";
import {RecipeFormComponent} from "./components/recipe/recipe-form/recipe-form.component";
import {RecipeDetailsComponent} from "./components/recipe/recipe-details/recipe-details.component";
import {LoginComponent} from "./components/user/login/login.component";
import {ProfileComponent} from "./components/user/profile/profile.component";
import {AuthenticatedGuardGuard} from "./guards/authenticated/authenticated-guard.guard";
import {UserCreationComponent} from "./components/user/user-creation/user-creation.component";
import {DisplayIngredientStockComponent} from "./components/ingredient/display-ingredient-stock/display-ingredient-stock.component";
import {DisplayRecipesComponent} from "./components/recipe/display-recipes/display-recipes.component";
import {DisplayIngredientComponent} from "./components/ingredient/display-ingredient/display-ingredient.component";
import {AdminGuard} from "./guards/admin/admin.guard";
import {LoginRedirectGuard} from "./guards/login-redirect/login-redirect.guard";
import {AppComponent} from "./app.component";
import {SettingsPageComponent} from "./components/settings/settings-page/settings-page.component";

const routes: Routes = [
  {
    path: 'ingredients',
    component: DisplayIngredientComponent,
    canActivate: [AuthenticatedGuardGuard]
  },
  {
    path: 'ingredients/add',
    component: IngredientFormComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'ingredients/edit/:id',
    component: IngredientFormComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'recipes',
    component: DisplayRecipesComponent,
    canActivate: [AuthenticatedGuardGuard],
    runGuardsAndResolvers: "always"
  },
  {
    path: 'recipes/add',
    component: RecipeFormComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginRedirectGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticatedGuardGuard]
  },
  {
    path: 'user-creation',
    component: UserCreationComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "recipe/details/:id",
    component: RecipeDetailsComponent,
    canActivate: [AuthenticatedGuardGuard]
  },
  {
    path: "recipe/edit/:id",
    component: RecipeFormComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "stock",
    component: DisplayIngredientStockComponent,
    canActivate: [AdminGuard]
  },
  {
    path: "settings",
    component: SettingsPageComponent,
    canActivate: [AdminGuard]
  },
  {
    path: '',
    component: AppComponent,
    canActivate: [LoginRedirectGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: "reload"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
