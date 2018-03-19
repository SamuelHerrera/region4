import { TestBed, inject } from '@angular/core/testing';

import { PagofacilService } from './pagofacil.service';

describe('PagofacilService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PagofacilService]
    });
  });

  it('should be created', inject([PagofacilService], (service: PagofacilService) => {
    expect(service).toBeTruthy();
  }));
});
