import { TestBed } from '@angular/core/testing';

import { FavouritesService } from './favourites.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('FavouritesService', () => {
  let service: FavouritesService;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(FavouritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
