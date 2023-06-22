import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteComponent } from './favourite.component';
import { AppRoutingModule, routes } from '../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { FavouritesService } from '../services/favourites.service';

describe('FavouriteComponent', () => {
  let component: FavouriteComponent;
  let fixture: ComponentFixture<FavouriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule, FormsModule, HttpClientModule, RouterTestingModule.withRoutes(routes)],
      providers: [FavouritesService],
      declarations: [ FavouriteComponent, FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
