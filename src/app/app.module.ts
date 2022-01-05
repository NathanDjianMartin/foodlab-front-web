import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TabIngredientsComponent} from './components/ingredient/tab-ingredients/tab-ingredients.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { IngredientFormComponent } from './components/ingredient/ingredient-form/ingredient-form.component';
import { NavbarComponent } from './components/general/navbar/navbar.component';
import { AddIngredientCategoryComponent } from './components/ingredient-category/add-ingredient-category/add-ingredient-category.component';
import { AddAllergenCategoryComponent } from './components/allergen-category/add-allergen-category/add-allergen-category.component';
import { AllergenCategoryListComponent } from './components/allergen-category/allergen-category-list/allergen-category-list.component';
import { IngredientCategoryListComponent } from './components/ingredient-category/ingredient-category-list/ingredient-category-list.component';
import { FooterComponent } from './components/general/footer/footer.component';
import { TabRecipesComponent } from './components/recipe/tab-recipes/tab-recipes.component';
import { RecipeFormComponent } from './components/recipe/recipe-form/recipe-form.component';
import { AddRecipeCategoryComponent } from './components/recipe-category/add-recipe-category/add-recipe-category.component';
import { RecipeCategoryListComponent } from './components/recipe-category/recipe-category-list/recipe-category-list.component';
import { RecipeExecutionListComponent } from './components/recipe/recipe-execution-list/recipe-execution-list.component';
import { RecipeIngredientsListComponent } from './components/recipe/recipe-ingredients-list/recipe-ingredients-list.component';
import { RecipeHeaderComponent } from './components/recipe/recipe-header/recipe-header.component';
import { RecipeDetailsComponent } from './components/recipe/recipe-details/recipe-details.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { UserCreationComponent } from './components/user/user-creation/user-creation.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { AddStepWithinRecipeExecutionComponent } from './components/recipe/add-step-within-recipe-execution/add-step-within-recipe-execution.component';
import { TabIngredientsToAddComponent } from './components/recipe/tab-ingredients-to-add/tab-ingredients-to-add.component';
import { DisplayIngredientStockComponent } from './components/ingredient/display-ingredient-stock/display-ingredient-stock.component';
import { IngredientStockByCategoryComponent } from './components/ingredient/ingredient-stock-by-category/ingredient-stock-by-category.component';
import { DisplayRecipesComponent } from './components/recipe/display-recipes/display-recipes.component';
import { TabRecipesByCategoryComponent } from './components/recipe/tab-recipes-by-category/tab-recipes-by-category.component';
import { DisplayIngredientComponent } from './components/ingredient/display-ingredient/display-ingredient.component';
import { IngredientByCategoryComponent } from './components/ingredient/ingredient-by-category/ingredient-by-category.component';
import { DisplayCostComponent } from './components/cost-data/display-cost/display-cost.component';
import { AddProgressionWithinRecipeExecutionComponent } from './components/recipe/add-progression-within-recipe-execution/add-progression-within-recipe-execution.component';

@NgModule({
    declarations: [
        AppComponent,
        TabIngredientsComponent,
        IngredientFormComponent,
        NavbarComponent,
        AddIngredientCategoryComponent,
        AddAllergenCategoryComponent,
        AllergenCategoryListComponent,
        IngredientCategoryListComponent,
        FooterComponent,
        TabRecipesComponent,
        RecipeFormComponent,
        AddRecipeCategoryComponent,
        RecipeCategoryListComponent,
        RecipeExecutionListComponent,
        RecipeIngredientsListComponent,
        RecipeHeaderComponent,
        RecipeDetailsComponent,
        LoginComponent,
        ProfileComponent,
        UserCreationComponent,
        UserListComponent,
        AddStepWithinRecipeExecutionComponent,
        TabIngredientsToAddComponent,
        DisplayIngredientStockComponent,
        IngredientStockByCategoryComponent,
        DisplayRecipesComponent,
        TabRecipesByCategoryComponent,
        DisplayIngredientComponent,
        IngredientByCategoryComponent,
        DisplayCostComponent,
        AddProgressionWithinRecipeExecutionComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
