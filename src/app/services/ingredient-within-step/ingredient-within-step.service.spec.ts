import { TestBed } from '@angular/core/testing';

import { IngredientWithinStepService } from './ingredient-within-step.service';

describe('IngredientWithinStepService', () => {
  let service: IngredientWithinStepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientWithinStepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
