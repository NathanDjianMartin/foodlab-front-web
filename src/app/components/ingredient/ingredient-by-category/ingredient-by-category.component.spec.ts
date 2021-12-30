import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientByCategoryComponent } from './ingredient-by-category.component';

describe('IngredientByCategoryComponent', () => {
  let component: IngredientByCategoryComponent;
  let fixture: ComponentFixture<IngredientByCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientByCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
