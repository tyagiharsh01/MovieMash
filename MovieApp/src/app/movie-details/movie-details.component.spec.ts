import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsComponent } from './movie-details.component';
import { FavouritesService } from '../services/favourites.service';
import { GetMovieDetailsService } from '../services/get-movie-details.service';
import { AppRoutingModule, routes } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

describe('MovieDetailsComponent', () => {
  let component: MovieDetailsComponent;
  let fixture: ComponentFixture<MovieDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule, FormsModule, HttpClientModule, RouterTestingModule.withRoutes(routes), ReactiveFormsModule,  MatFormFieldModule, MatInputModule, MatIconModule],
      providers: [GetMovieDetailsService, FavouritesService],
      declarations: [ MovieDetailsComponent, HeaderComponent, FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
