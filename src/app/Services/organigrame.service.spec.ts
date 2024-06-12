import { TestBed } from '@angular/core/testing';

import { OrganigrameService } from './organigrame.service';

describe('OrganigrameService', () => {
  let service: OrganigrameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganigrameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
