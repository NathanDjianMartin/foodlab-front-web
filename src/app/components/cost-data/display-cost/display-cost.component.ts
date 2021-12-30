import {Component, Input, OnInit} from '@angular/core';
import {CostDataService} from "../../../services/cost-data/cost-data.service";
import {RecipeService} from "../../../services/recipe/recipe.service";
import {CostData} from "../../../models/cost-data/cost-data";

@Component({
  selector: 'app-display-cost',
  templateUrl: './display-cost.component.html',
  styleUrls: ['./display-cost.component.css']
})
export class DisplayCostComponent implements OnInit {
  @Input() recipeId?: number
  materialCost!: number;
  chargesCost!: number;
  staffCost!: number;
  fluidsCost!: number;
  salesPricesWithCharges!: number;
  salesPricesWithoutCharges!: number;
  productionCost!: number;
  portionProfit!: number;
  breakEvenPoint!: number;

  constructor(private costDataService: CostDataService,
              private recipeService: RecipeService
              ) { }

  ngOnInit(): void {
    this.costDataService.getCostData(1).subscribe( (cost) => {
      let costData: CostData = cost;
      this.recipeService.getIngredientsCost(this.recipeId!).subscribe( (cost) => {
        console.log(cost);
        let ingredientsCost = cost;
        this.materialCost = ingredientsCost + ingredientsCost*0.05; //TODO: def assaisonnement autrement
        this.salesPricesWithoutCharges = this.materialCost * costData.coefWithoutCharges;

        this.recipeService.getDuration(this.recipeId!).subscribe( (duration) => {
          console.log(duration);
          this.staffCost = duration/60 * costData.averageHourlyCost;
          this.fluidsCost = duration/60 * costData.flatrateHourlyCost;
          this.chargesCost = this.staffCost + this.fluidsCost;

          this.productionCost = this.materialCost + this.chargesCost;

          this.salesPricesWithCharges = this.productionCost * costData.coefWithCharges;

          this.portionProfit = this.salesPricesWithCharges - this.productionCost;
          console.log("fin")
        });
    })

    });
  }

}
