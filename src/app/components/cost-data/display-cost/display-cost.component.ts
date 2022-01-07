import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CostDataService} from "../../../services/cost-data/cost-data.service";
import {RecipeService} from "../../../services/recipe/recipe.service";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-display-cost',
  templateUrl: './display-cost.component.html',
  styleUrls: ['./display-cost.component.css']
})
export class DisplayCostComponent implements OnInit, OnChanges {
  @Input() recipeId?: number
  @Input() isChange: number = 0;
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
              private recipeService: RecipeService
              ) { }

  ngOnInit(): void {

    this.init();

  }

  ngOnChanges(changes: SimpleChanges): void {
    //on recharge les valeurs
    this.init();
    this.init();
  }

  init(){
    this.costDataService.getCostData(1).subscribe( (cost) => {
      this.averageHourlyCost = cost.averageHourlyCost;
      this.flatrateHourlyCost = cost.flatrateHourlyCost;
      this.coefWithCharges = cost.coefWithCharges;
      this.coefWithoutCharges = cost.coefWithoutCharges;
    });

    this.calculateCosts();
  }

  calculateCosts(){
    this.recipeService.getIngredientsCost(this.recipeId!).subscribe( (cost) => {
        let ingredientsCost = cost;
        this.materialCost = this.round(ingredientsCost + ingredientsCost*0.05); //TODO: def assaisonnement autrement
        this.salesPricesWithoutCharges = this.round(this.materialCost * this.coefWithoutCharges);

        this.recipeService.getDuration(this.recipeId!).subscribe( (duration) => {
          this.staffCost = duration/60 * this.averageHourlyCost;
          this.fluidsCost = duration/60 * this.flatrateHourlyCost;
          this.chargesCost = this.staffCost + this.fluidsCost;

          this.productionCost = this.materialCost + this.chargesCost;

          this.salesPricesWithCharges = this.round(this.productionCost * this.coefWithCharges);

          this.portionProfit = this.round(this.salesPricesWithCharges - this.productionCost);
        });
      })
  }

  round(val : number) : number{
    return Math.round(val * 100) / 100
  }

  manageCostEvent(){
    this.manageCost = !this.manageCost;
  }

}
