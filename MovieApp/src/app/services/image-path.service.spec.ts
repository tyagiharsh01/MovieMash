import { TestBed } from '@angular/core/testing';

import { ImagePathService } from './image-path.service';
import { HttpClientModule } from '@angular/common/http';

describe('ImagePathService', () => {
  let service: ImagePathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ImagePathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
