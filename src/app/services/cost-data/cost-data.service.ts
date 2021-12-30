import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CostData} from "../../models/cost-data/cost-data";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CostDataService {

  constructor(private httpService: HttpClient) { }

  jsonToIngredient(json: any): CostData {
    let costData: CostData =  new CostData(json.averageHourlyCost,
        json.flatrateHourlyCost,
        json.coefWithCharges,
        json.coefWithoutCharges);
    costData.id = json.id;
    return costData;
  }

  getCostData(id: number): Observable<CostData> {
    return this.httpService.get<CostData>(`http://localhost:3000/cost-data/${id}`).pipe(
        map( json => this.jsonToIngredient(json)));
  }
}