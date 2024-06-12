import { TestBed } from '@angular/core/testing';

import { TypeBudgetService } from './type-budget.service';

describe('TypeBudgetService', () => {
  let service: TypeBudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeBudgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
