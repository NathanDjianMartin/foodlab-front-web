import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CostData} from "../../../models/cost-data/cost-data";
import {CostDataService} from "../../../services/cost-data/cost-data.service";
import {LoggerService} from "../../../services/logger/logger.service";

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {
  costDataFormGroup!: FormGroup;
  managingType! : string;
  manageRecipeCategory: boolean = false;
  manageAllergenCategory: boolean = false;
  manageIngredientCategory: boolean = false;
  manageDefaultCostData: boolean = false;

  constructor(private costDataService: CostDataService,
              private fb: FormBuilder,
              private loggerService: LoggerService) { }

  ngOnInit(): void {
    this.managingType = "ingredient-category"
    this.costDataService.getCostData(1).subscribe({
      next: (defaultCostData) => {
        this.costDataFormGroup = this.fb.group({
          averageHourlyCost: [defaultCostData.averageHourlyCost, [Validators.required]],
          flatrateHourlyCost: [defaultCostData.flatrateHourlyCost, [Validators.required]],
          coefWithCharges: [defaultCostData.coefWithCharges, [Validators.required]],
          coefWithoutCharges: [defaultCostData.coefWithoutCharges, [Validators.required]]
        });
      }
    })
    this.toggleRecipeCategoryManagement();
  }

  updateDefaultCostData(){
    let costData = new CostData(
        this.costDataFormGroup.get("averageHourlyCost")?.value,
        this.costDataFormGroup.get("flatrateHourlyCost")?.value,
        this.costDataFormGroup.get("coefWithCharges")?.value,
        this.costDataFormGroup.get("coefWithoutCharges")?.value);
    this.costDataService.updateDefaultCostData(costData).subscribe({
      next: (data) => {
        this.loggerService.displaySuccess("Default cost data updated!")
      }, error: (error) => {
        this.loggerService.displayError("Error in updating cost data!")
      }
    });
  }

  toggleRecipeCategoryManagement() {
    this.manageRecipeCategory = true;
    this.manageAllergenCategory = false;
    this.manageDefaultCostData = false;
    this.manageIngredientCategory = false;
  }

  toggleAllergenCategoryManagement() {
    this.manageRecipeCategory = false;
    this.manageAllergenCategory = true;
    this.manageDefaultCostData = false;
    this.manageIngredientCategory = false;
  }

  toggleIngredientCategoryManagement() {
    this.manageRecipeCategory = false;
    this.manageAllergenCategory = false;
    this.manageDefaultCostData = false;
    this.manageIngredientCategory = true;
  }

  toggleDefaultCostDataManagement() {
    this.manageRecipeCategory = false;
    this.manageAllergenCategory = false;
    this.manageDefaultCostData = true;
    this.manageIngredientCategory = false;
  }
}
