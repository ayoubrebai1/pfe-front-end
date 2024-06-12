import { TestBed } from '@angular/core/testing';

import { TypeCentreService } from './type-centre.service';

describe('TypeCentreService', () => {
  let service: TypeCentreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeCentreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
