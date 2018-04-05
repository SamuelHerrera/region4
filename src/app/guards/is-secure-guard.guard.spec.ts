import { TestBed, async, inject } from '@angular/core/testing';

import { IsSecureGuard } from './is-secure-guard.guard';

describe('IsSecureGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsSecureGuard]
    });
  });

  it('should ...', inject([IsSecureGuard], (guard: IsSecureGuard) => {
    expect(guard).toBeTruthy();
  }));
});
