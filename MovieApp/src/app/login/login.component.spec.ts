import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import { FavouritesService } from '../services/favourites.service';
import { AppRoutingModule, routes } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule.withRoutes(routes), MatCardModule,  MatTabsModule,
                 MatInputModule, BrowserAnimationsModule, MatDialogModule],
      providers: [MatSnackBar, LoginService,FavouritesService],
      declarations: [ LoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
