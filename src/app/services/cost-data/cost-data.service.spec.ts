import { TestBed } from '@angular/core/testing';

import { CostDataService } from './cost-data.service';

describe('CostDataService', () => {
  let service: CostDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
