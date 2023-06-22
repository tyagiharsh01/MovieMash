import { TestBed } from '@angular/core/testing';

import { LogoutGuard } from './logout.guard';
import { HttpClientModule } from '@angular/common/http';

describe('LogoutGuard', () => {
  let guard: LogoutGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogoutGuard], // Include LogoutGuard as a provider
      imports: [HttpClientModule]
    });
    guard = TestBed.inject(LogoutGuard);
  });
  

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
