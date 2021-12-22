import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllergenCategoryListComponent } from './allergen-category-list.component';

describe('AllergenCategoryListComponent', () => {
  let component: AllergenCategoryListComponent;
  let fixture: ComponentFixture<AllergenCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllergenCategoryListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllergenCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
