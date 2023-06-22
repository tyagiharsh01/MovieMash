import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateComponent } from './update.component';
import { MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavouritesService } from '../services/favourites.service';
import { AppRoutingModule, routes } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../services/login.service';

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatInputModule,
        MatDialogModule,
        BrowserAnimationsModule,
        HttpClientTestingModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        MatIconModule
      ],
      providers: [
        FavouritesService,
        LoginService,
        MatSnackBar,
        { provide: MAT_DIALOG_DATA, useValue: {} }
      ],
      declarations: [ UpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
