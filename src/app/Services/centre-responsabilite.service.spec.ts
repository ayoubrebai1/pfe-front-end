import { TestBed } from '@angular/core/testing';

import { CentreResponsabiliteService } from './centre-responsabilite.service';

describe('CentreResponsabiliteService', () => {
  let service: CentreResponsabiliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentreResponsabiliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
