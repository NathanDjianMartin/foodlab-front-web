import { TestBed } from '@angular/core/testing';

import { StepWithinRecipeExecutionService } from './step-within-recipe-execution.service';

describe('StepWithinRecipeExecutionService', () => {
  let service: StepWithinRecipeExecutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepWithinRecipeExecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
