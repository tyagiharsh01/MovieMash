import { TestBed } from '@angular/core/testing';

import { GetMovieDetailsService } from './get-movie-details.service';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('GetMovieDetailsService', () => {
  let service: GetMovieDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(GetMovieDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
