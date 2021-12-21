import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TabIngredientsComponent} from './components/ingredient/tab-ingredients/tab-ingredients.component';
import {HttpClientModule} from "@angular/common/http";
import {ReactiveFormsModule} from "@angular/forms";
import { IngredientFormComponent } from './components/ingredient/ingredient-form/ingredient-form.component';
import { NavbarComponent } from './components/general/navbar/navbar.component';

@NgModule({
    declarations: [
        AppComponent,
        TabIngredientsComponent,
        IngredientFormComponent,
        NavbarComponent
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
