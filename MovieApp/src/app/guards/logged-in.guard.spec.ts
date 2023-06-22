import { TestBed } from '@angular/core/testing';

import { LoggedInGuard } from './logged-in.guard';
import { HttpClientModule } from '@angular/common/http';

describe('LoggedInGuard', () => {
  let guard: LoggedInGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    guard = TestBed.inject(LoggedInGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
