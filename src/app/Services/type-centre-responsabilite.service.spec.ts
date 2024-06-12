import { TestBed } from '@angular/core/testing';

import { TypeCentreResponsabiliteService } from './type-centre-responsabilite.service';

describe('TypeCentreResponsabiliteService', () => {
  let service: TypeCentreResponsabiliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCentreResponsabiliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
