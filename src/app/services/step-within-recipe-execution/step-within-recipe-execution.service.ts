import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {StepWithinRecipeExecution} from "../../models/step-within-recipe-execution/step-within-recipe-execution";
import {RecipeExecution} from "../../models/recipe-execution/recipe-execution";
import {RecipeExecutionService} from "../recipe-execution/recipe-execution.service";
import {environment} from "../../../environments/environment";

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

    getAllSimpleStepsWithinRecipeExecution(id: number): Observable<StepWithinRecipeExecution[]> {
        return this.httpService.get<StepWithinRecipeExecution[]>(`${environment.apiUrl}/recipe-execution/all-simple-steps/${id}`).pipe(
            map(data =>
                data.map(json => this.jsonToStepWithinRecipeExecution(json))));
    }

    getAllStepsWithinRecipeExecution(id: number): Observable<StepWithinRecipeExecution[]> {
        return this.httpService.get<StepWithinRecipeExecution[]>(`${environment.apiUrl}/recipe-execution/all-steps/${id}`).pipe(
            map(data =>
                data.map(json => this.jsonToStepWithinRecipeExecution(json))));
    }

    getAllProgressionWithinRecipeExecution(id: number): Observable<StepWithinRecipeExecution[]> {
        return this.httpService.get<StepWithinRecipeExecution[]>(`${environment.apiUrl}/recipe-execution/all-recipe-executions/${id}`).pipe(
            map(data =>
                data.map(json => this.jsonToStepWithinRecipeExecution(json))));
    }

    createStepWithinRecipeExecution(stepWithinRecipeExecution: StepWithinRecipeExecution): Observable<StepWithinRecipeExecution> {
        return this.httpService.post<StepWithinRecipeExecution>(`${environment.apiUrl}/step-within-recipe-execution`,
            {
            "stepId": stepWithinRecipeExecution.stepId,
            "recipeExecutionId": stepWithinRecipeExecution.recipeExecutionId
        }).pipe(
            map( json => this.jsonToStepWithinRecipeExecution(json))
        );
    }

    updateStepWithinRecipeExecution(stepWithinRecipeExecution: StepWithinRecipeExecution): Observable<StepWithinRecipeExecution> {
        return this.httpService.patch<StepWithinRecipeExecution>(`${environment.apiUrl}/step-within-recipe-execution/${stepWithinRecipeExecution.id}`,
            {
                "number": stepWithinRecipeExecution.number
            }).pipe(
            map( json => this.jsonToStepWithinRecipeExecution(json))
        );
    }

    //Update all steps within recipe execution
    updateStepsOrderOfRecipeExecution(stepsWithinRecipeExecution: StepWithinRecipeExecution[]): Observable<StepWithinRecipeExecution[]> {
        let dto = [];
        for(let stepWithinRecipeExecution of stepsWithinRecipeExecution){
            dto.push({
                "id": stepWithinRecipeExecution.id,
                "number": stepWithinRecipeExecution.number
            })
        }
        let res = this.httpService.patch<StepWithinRecipeExecution[]>(
            `${environment.apiUrl}/recipe-execution/update-steps-order`, dto).pipe(
                map(data =>
                    data.map(json => this.jsonToStepWithinRecipeExecution(json)))
        );
        return res;
    }

    deleteStepWithinRecipeExecution(id: number) {
        return this.httpService.delete<number>(`${environment.apiUrl}/step-within-recipe-execution/${id}`);
    }
}
