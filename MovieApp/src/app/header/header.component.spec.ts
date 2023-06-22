import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { LoginService } from '../services/login.service';
import { GetMovieDetailsService } from '../services/get-movie-details.service';
import { ImagePathService } from '../services/image-path.service';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from '../app-routing.module';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppRoutingModule,FormsModule, ReactiveFormsModule,HttpClientModule,RouterTestingModule.withRoutes(routes)],
      providers: [LoginService, GetMovieDetailsService, ImagePathService],
      declarations: [ HeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
