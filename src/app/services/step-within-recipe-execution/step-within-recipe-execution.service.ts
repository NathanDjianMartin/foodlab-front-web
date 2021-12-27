import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {StepWithinRecipeExecution} from "../../models/step-within-recipe-execution/step-within-recipe-execution";
import {RecipeExecution} from "../../models/recipe-execution/recipe-execution";
import {RecipeExecutionService} from "../recipe-execution/recipe-execution.service";

@Injectable({
    providedIn: 'root'
})
export class StepWithinRecipeExecutionService {

    constructor(private httpService: HttpClient,
                private recipeExecutionService: RecipeExecutionService) {
    }

    jsonToStepWithinRecipeExecution(json: any): StepWithinRecipeExecution {
        let stepWithinRecipeExecution: StepWithinRecipeExecution = new StepWithinRecipeExecution(json.stepId, json.recipeExecutionId, json.number);
        stepWithinRecipeExecution.id = json.id;
        if (json.step) {
            //je stock la recipeExecution
            stepWithinRecipeExecution.step = this.recipeExecutionService.jsonToRecipeExecution(json.step);
            //new RecipeExecution(json.isStep, json.stepTitle, json.stepDescription, json.duration)
            //stepWithinRecipeExecution.recipeExecution.id = json.step.id;
        }
        return stepWithinRecipeExecution;
    }

    getAllStepWithinRecipeExecution(id: number): Observable<StepWithinRecipeExecution[]> {
        return this.httpService.get<StepWithinRecipeExecution[]>(`http://localhost:3000/step-within-recipe-execution/steps/${id}`).pipe(
            map(data =>
                data.map(json => this.jsonToStepWithinRecipeExecution(json))));
    }

    getAllProgressionWithinRecipeExecution(id: number): Observable<StepWithinRecipeExecution[]> {
        return this.httpService.get<StepWithinRecipeExecution[]>(`http://localhost:3000/step-within-recipe-execution/progressions/${id}`).pipe(
            map(data =>
                data.map(json => this.jsonToStepWithinRecipeExecution(json))));
    }

    createStepWithinRecipeExecution(stepWithinRecipeExecution: StepWithinRecipeExecution): Observable<StepWithinRecipeExecution> {
        console.log( {
            "stepId": stepWithinRecipeExecution.stepId,
            "recipeExecutionId": stepWithinRecipeExecution.recipeExecutionId,
            "number": stepWithinRecipeExecution.number
        });
        return this.httpService.post<StepWithinRecipeExecution>("http://localhost:3000/step-within-recipe-execution",
            {
            "stepId": stepWithinRecipeExecution.stepId,
            "recipeExecutionId": stepWithinRecipeExecution.recipeExecutionId,
            "number": stepWithinRecipeExecution.number
        }).pipe(
            map( json => this.jsonToStepWithinRecipeExecution(json))
        );
    }

    deleteStepWithinRecipeExecution(id: number) {
        return this.httpService.delete<number>(`http://localhost:3000/step-within-recipe-execution/${id}`);
    }
}
