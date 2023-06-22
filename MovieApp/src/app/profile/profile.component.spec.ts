import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FavouritesService } from '../services/favourites.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginService } from '../services/login.service';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatDialogModule, HttpClientTestingModule],
      providers:[FavouritesService, LoginService],
      declarations: [ ProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
