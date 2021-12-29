import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientStockByCategoryComponent } from './ingredient-stock-by-category.component';

describe('IngredientStockByCategoryComponent', () => {
  let component: IngredientStockByCategoryComponent;
  let fixture: ComponentFixture<IngredientStockByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientStockByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientStockByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
