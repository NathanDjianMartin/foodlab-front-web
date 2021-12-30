import {Optional} from "@angular/core";

export class CostData {
    public id?: number;
    public averageHourlyCost: number;
    public flatrateHourlyCost: number;
    public coefWithCharges: number;
    public coefWithoutCharges: number;


    constructor(averageHourlyCost: number, flatrateHourlyCost: number, coefWithCharges: number, coefWithoutCharges: number) {
        this.averageHourlyCost = averageHourlyCost;
        this.flatrateHourlyCost = flatrateHourlyCost;
        this.coefWithCharges = coefWithCharges;
        this.coefWithoutCharges = coefWithoutCharges;
    }

}
