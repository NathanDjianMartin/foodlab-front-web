import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CostDataService} from "../../../services/cost-data/cost-data.service";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {FormsModule} from '@angular/forms';
import {CostData} from "../../../models/cost-data/cost-data";
import {LoggerService} from "../../../services/logger/logger.service";

@Component({
    selector: 'app-display-cost',
    templateUrl: './display-cost.component.html',
    styleUrls: ['./display-cost.component.css']
})
export class DisplayCostComponent implements OnInit, OnChanges {
    @Input() recipeId?: number
    @Input() isChange: number = 0;
    currentCostData!: CostData;
    materialCost!: number;
    chargesCost!: number;
    staffCost!: number;
    fluidsCost!: number;
    salesPricesWithCharges!: number;
    salesPricesWithoutCharges!: number;
    productionCost!: number;
    portionProfit!: number;
    breakEvenPoint!: number;//TODO

    averageHourlyCost!: number
    flatrateHourlyCost!: number
    coefWithCharges!: number
    coefWithoutCharges!: number

    manageCost: boolean = false;

    constructor(private costDataService: CostDataService,
                private recipeService: RecipeService,
                private loggerService: LoggerService
    ) {
    }

    ngOnInit(): void {

        this.init();

    }

    ngOnChanges(changes: SimpleChanges): void {
        //on recharge les valeurs
        this.init();
        this.init();
    }

    init() {
        if(this.recipeId) {
            this.recipeService.getOneRecipe(this.recipeId).subscribe({
                next: (recipe) => {
                    this.costDataService.getCostData(recipe.costDataId).subscribe((cost) => {
                        this.averageHourlyCost = cost.averageHourlyCost;
                        this.flatrateHourlyCost = cost.flatrateHourlyCost;
                        this.coefWithCharges = cost.coefWithCharges;
                        this.coefWithoutCharges = cost.coefWithoutCharges;
                        this.currentCostData = cost;
                    });
                }
            })
            this.calculateCosts();
        }

    }

    calculateCosts() {
        this.recipeService.getIngredientsCost(this.recipeId!).subscribe((cost) => {
            let ingredientsCost = cost;
            this.materialCost = this.round(ingredientsCost + ingredientsCost * 0.05); //TODO: def assaisonnement autrement
            this.salesPricesWithoutCharges = this.round(this.materialCost * this.coefWithoutCharges);

            this.recipeService.getDuration(this.recipeId!).subscribe((duration) => {
                this.staffCost = duration / 60 * this.averageHourlyCost;
                this.fluidsCost = duration / 60 * this.flatrateHourlyCost;
                this.chargesCost = this.round(this.staffCost + this.fluidsCost);

                this.productionCost = this.round(this.materialCost + this.chargesCost);

                this.salesPricesWithCharges = this.round(this.productionCost * this.coefWithCharges);

                this.portionProfit = this.round(this.salesPricesWithCharges - this.productionCost);
            });
        })
    }

    round(val: number): number {
        return Math.round(val * 100) / 100
    }

    manageCostEvent() {
        this.manageCost = !this.manageCost;
    }

    updateRecipeCostData() {
        if( this.averageHourlyCost != this.currentCostData.averageHourlyCost ||
            this.flatrateHourlyCost != this.currentCostData.flatrateHourlyCost ||
            this.coefWithCharges != this.currentCostData.coefWithCharges ||
            this.coefWithoutCharges != this.currentCostData.coefWithoutCharges) {

            let costData: CostData = new CostData(
                this.averageHourlyCost,
                this.flatrateHourlyCost,
                this.coefWithCharges,
                this.coefWithoutCharges,)
            this.recipeService.updateCostData(this.recipeId!, costData).subscribe({
                next: (data) => {
                    this.loggerService.displaySuccess("Cost data updated");
                }, error: (error) => {
                    this.loggerService.displayError("Error in updating cost data");
                }
            });
        }
    }

}
