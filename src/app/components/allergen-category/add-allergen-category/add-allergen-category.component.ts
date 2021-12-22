import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AllergenCategoryService} from "../../../services/allergen-category/allergen-category.service";
import {AllergenCategory} from "../../../models/allergen-category/allergen-category";

@Component({
  selector: 'app-add-allergen-category',
  templateUrl: './add-allergen-category.component.html',
  styleUrls: ['./add-allergen-category.component.css']
})
export class AddAllergenCategoryComponent implements OnInit {
  allergenCategoryFormGroup!: FormGroup;

  constructor(private allergenCategoryService: AllergenCategoryService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.allergenCategoryFormGroup = this.fb.group({
      name:[null,[Validators.required]]
    })
  }

  createAllergenCategory(){
    let allergenCategory = new AllergenCategory(this.allergenCategoryFormGroup.get("name")?.value);
    this.allergenCategoryService.createAllergenCategory(allergenCategory).subscribe((data) => {
      this.ngOnInit() });
  }

}
