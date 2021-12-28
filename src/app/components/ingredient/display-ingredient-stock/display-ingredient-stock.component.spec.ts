import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayIngredientStockComponent } from './display-ingredient-stock.component';

describe('DisplayIngredientStockComponent', () => {
  let component: DisplayIngredientStockComponent;
  let fixture: ComponentFixture<DisplayIngredientStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayIngredientStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayIngredientStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
