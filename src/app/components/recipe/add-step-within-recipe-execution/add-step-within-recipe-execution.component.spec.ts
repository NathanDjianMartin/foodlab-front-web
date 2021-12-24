import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStepWithinRecipeExecutionComponent } from './add-step-within-recipe-execution.component';

describe('AddStepWithinRecipeExecutionComponent', () => {
  let component: AddStepWithinRecipeExecutionComponent;
  let fixture: ComponentFixture<AddStepWithinRecipeExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStepWithinRecipeExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStepWithinRecipeExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
