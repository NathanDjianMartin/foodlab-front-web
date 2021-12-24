import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TabIngredientsComponent} from './components/ingredient/tab-ingredients/tab-ingredients.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
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
import { AddStepWithinRecipeExecutionComponent } from './components/recipe/add-step-within-recipe-execution/add-step-within-recipe-execution.component';

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
        AddStepWithinRecipeExecutionComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
