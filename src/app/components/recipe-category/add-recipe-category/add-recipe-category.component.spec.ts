import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeCategoryComponent } from './add-recipe-category.component';

describe('AddRecipeCategoryComponent', () => {
  let component: AddRecipeCategoryComponent;
  let fixture: ComponentFixture<AddRecipeCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRecipeCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRecipeCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
