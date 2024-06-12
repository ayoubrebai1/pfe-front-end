import { TestBed } from '@angular/core/testing';

import { DetailBudgetServiceService } from './detail-budget-service.service';

describe('DetailBudgetServiceService', () => {
  let service: DetailBudgetServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailBudgetServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
