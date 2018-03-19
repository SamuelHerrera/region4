import { TestBed, inject } from '@angular/core/testing';

import { YalsService } from './yals.service';

describe('YalsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YalsService]
    });
  });

  it('should be created', inject([YalsService], (service: YalsService) => {
    expect(service).toBeTruthy();
  }));
});
