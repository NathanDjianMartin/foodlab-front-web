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
import { AddRecipeComponent } from './components/recipe/add-recipe/add-recipe.component';

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
        AddRecipeComponent
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
export class AppModule {
}
