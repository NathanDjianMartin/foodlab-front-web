import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {RecipeCategoryService} from "../../../services/recipe-category/recipe-category.service";
import {RecipeCategory} from "../../../models/recipe-category/recipe-category";
import {Recipe} from "../../../models/recipe/recipe";
import {LoggerService} from "../../../services/logger/logger.service";

@Component({
    selector: 'app-recipe-form',
    templateUrl: './recipe-form.component.html',
    styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {
    recipeCategories!: Observable<RecipeCategory[]>;
    recipeFormGroup!: FormGroup;
    manageRecipeCategory!: boolean;
    recipeId?: number;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private recipeService: RecipeService,
        private recipeCategoryService: RecipeCategoryService,
        private fb: FormBuilder,
        private loggerService: LoggerService
    ) {
    }

    ngOnInit(): void {
        this.manageRecipeCategory = false;
        this.recipeCategories = this.recipeCategoryService.getAllRecipeCategories();

        const paramRecipeId: string | null = this.route.snapshot.paramMap.get('id');
        this.recipeId = paramRecipeId !== null ? parseInt(paramRecipeId) : undefined;

        this.recipeFormGroup = this.fb.group({
            name: [null, [Validators.required]],
            author: [null, [Validators.required]],
            guestsNumber: [null, [Validators.required]],
            recipeCategory: [null, [Validators.required]]
        });

        this.initRecipeForm();
    }

    initRecipeForm(): void {
        let name = null;
        let author = null;
        let guestsNumber = null;
        let recipeCategory = null;

        // retrieves the recipe if there is an "id" param and it corresponds to an recipe in the database
        if (this.recipeId !== undefined) {
            let recipe: Recipe;
            this.recipeService.getOneRecipe(this.recipeId).subscribe((recipe) => {
                name = recipe.name;
                author = recipe.author;
                guestsNumber = recipe.guestsNumber;

                this.recipeFormGroup = this.fb.group({
                    name: [name, [Validators.required]],
                    author: [author, [Validators.required]],
                    guestsNumber: [guestsNumber, [Validators.required]],
                    recipeCategory: [null, [Validators.required]]
                });

                this.recipeFormGroup.controls['recipeCategory'].setValue(recipe.recipeCategory);

            })
        }

        this.recipeFormGroup = this.fb.group({
            name: [name, [Validators.required]],
            author: [author, [Validators.required]],
            guestsNumber: [guestsNumber, [Validators.required]],
            recipeCategory: [recipeCategory, [Validators.required]]
        });
    }


    manageRecipeCategoryAction() {
        this.manageRecipeCategory = true;
    }

    getRecipeFromForm(){
        let recipe: Recipe | null = null;
        if (this.recipeFormGroup.valid) {
            recipe = new Recipe(
                this.recipeFormGroup.get("name")?.value,
                this.recipeFormGroup.get("author")?.value,
                this.recipeFormGroup.get("guestsNumber")?.value,
                this.recipeFormGroup.get("recipeCategory")?.value);
            recipe.id = this.recipeId;
        }
        return recipe;
    }

    createRecipe() {
        let recipe = this.getRecipeFromForm();

        if(recipe) {
            this.recipeService.createRecipe(recipe).subscribe(
                (recipe) => {
                    this.loggerService.displaySuccess("Recipe created! ")
                    this.router.navigate(['recipe/details', recipe.id!]);
                },
                (error) => {
                    this.loggerService.displayError("Error during recipe creation. Recipe has not been created! ")
                });
        }
    }

    updateRecipe() {
        let recipe = this.getRecipeFromForm();

        if(recipe) {
            this.recipeService.updateRecipe(recipe).subscribe(
                (recipe) => {
                    this.loggerService.displaySuccess("Recipe updated! ")
                    this.router.navigate(['recipe/details', recipe.id!]);
                },
                (error) => {
                    this.loggerService.displayError("Error during recipe update. Recipe has not been updated! ")
                });
        } else {
            this.loggerService.displayError("Invalid input! ")
        }
    }

}
