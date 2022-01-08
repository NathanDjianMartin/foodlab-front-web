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
        let stepWithinRecipeExecution: StepWithinRecipeExecution = new StepWithinRecipeExecution(json.stepId, json.recipeExecutionId);
        stepWithinRecipeExecution.id = json.id;
        if (json.step) {
            //je stock la recipeExecution
            stepWithinRecipeExecution.step = this.recipeExecutionService.jsonToRecipeExecution(json.step);
            //new RecipeExecution(json.isStep, json.stepTitle, json.stepDescription, json.duration)
            //stepWithinRecipeExecution.recipeExecution.id = json.step.id;
        }
        if( json.number){
            stepWithinRecipeExecution.number =  json.number;
        }
        return stepWithinRecipeExecution;
    }

    getAllStepWithinRecipeExecution(id: number): Observable<StepWithinRecipeExecution[]> {
        return this.httpService.get<StepWithinRecipeExecution[]>(`http://localhost:3000/recipe-execution/all-simple-steps/${id}`).pipe(
            map(data =>
                data.map(json => this.jsonToStepWithinRecipeExecution(json))));
    }

    getAllProgressionWithinRecipeExecution(id: number): Observable<StepWithinRecipeExecution[]> {
        return this.httpService.get<StepWithinRecipeExecution[]>(`http://localhost:3000/recipe-execution/all-recipe-executions/${id}`).pipe(
            map(data =>
                data.map(json => this.jsonToStepWithinRecipeExecution(json))));
    }

    createStepWithinRecipeExecution(stepWithinRecipeExecution: StepWithinRecipeExecution): Observable<StepWithinRecipeExecution> {
        return this.httpService.post<StepWithinRecipeExecution>("http://localhost:3000/step-within-recipe-execution",
            {
            "stepId": stepWithinRecipeExecution.stepId,
            "recipeExecutionId": stepWithinRecipeExecution.recipeExecutionId
        }).pipe(
            map( json => this.jsonToStepWithinRecipeExecution(json))
        );
    }

    updateStepWithinRecipeExecution(stepWithinRecipeExecution: StepWithinRecipeExecution): Observable<StepWithinRecipeExecution> {
        return this.httpService.patch<StepWithinRecipeExecution>(`http://localhost:3000/step-within-recipe-execution/${stepWithinRecipeExecution.id}`,
            {
                "number": stepWithinRecipeExecution.number
            }).pipe(
            map( json => this.jsonToStepWithinRecipeExecution(json))
        );
    }

    //Update all steps within recipe execution
    //TODO : renommer voir nom back
    updateStepsOrderOfRecipeExecution(stepsWithinRecipeExecution: StepWithinRecipeExecution[]): Observable<StepWithinRecipeExecution[]> {
        let dto = [];
        for(let stepWithinRecipeExecution of stepsWithinRecipeExecution){
            dto.push({
                "id": stepWithinRecipeExecution.id,
                "number": stepWithinRecipeExecution.number
            })
        }
        let res = this.httpService.patch<StepWithinRecipeExecution[]>(
            `http://localhost:3000/recipe-execution/update-steps-order`, dto).pipe(
                map(data =>
                    data.map(json => this.jsonToStepWithinRecipeExecution(json)))
        );
        return res;
    }

    deleteStepWithinRecipeExecution(id: number) {
        return this.httpService.delete<number>(`http://localhost:3000/step-within-recipe-execution/${id}`);
    }
}
