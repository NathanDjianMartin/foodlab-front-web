import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAllergenCategoryComponent } from './add-allergen-category.component';

describe('AddAllergenCategoryComponent', () => {
  let component: AddAllergenCategoryComponent;
  let fixture: ComponentFixture<AddAllergenCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAllergenCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAllergenCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
