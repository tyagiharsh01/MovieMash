import { TestBed } from '@angular/core/testing';

import { ContactUsService } from './contact-us.service';
import { HttpClientModule } from '@angular/common/http';

describe('ContactUsService', () => {
  let service: ContactUsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ContactUsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
