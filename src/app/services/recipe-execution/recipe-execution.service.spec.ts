import { TestBed } from '@angular/core/testing';

import { RecipeExecutionService } from './recipe-execution.service';

describe('RecipeExecutionService', () => {
  let service: RecipeExecutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeExecutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
