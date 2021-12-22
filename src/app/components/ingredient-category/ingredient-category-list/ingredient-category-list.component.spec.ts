import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientCategoryListComponent } from './ingredient-category-list.component';

describe('IngredientCategoryListComponent', () => {
  let component: IngredientCategoryListComponent;
  let fixture: ComponentFixture<IngredientCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
