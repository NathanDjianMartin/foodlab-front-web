import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgressionWithinRecipeExecutionComponent } from './add-progression-within-recipe-execution.component';

describe('AddProgressionWithinRecipeExecutionComponent', () => {
  let component: AddProgressionWithinRecipeExecutionComponent;
  let fixture: ComponentFixture<AddProgressionWithinRecipeExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgressionWithinRecipeExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProgressionWithinRecipeExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
