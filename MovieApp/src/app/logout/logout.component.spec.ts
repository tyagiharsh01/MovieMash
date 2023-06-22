import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutComponent } from './logout.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AppRoutingModule, routes } from '../app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

describe('LogoutComponent', () => {
  let component: LogoutComponent;
  let fixture: ComponentFixture<LogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[AppRoutingModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterTestingModule.withRoutes(routes)],
      declarations: [ LogoutComponent, DashboardComponent, HeaderComponent, FooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
