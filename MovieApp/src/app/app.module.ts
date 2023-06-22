import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Importing the components used in the application
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { LoadingComponent } from './loading/loading.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { LogoutComponent } from './logout/logout.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';

// Importing Angular Material modules used in the application
import { MatCardModule } from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

// Other Angular modules and services
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UpdateComponent } from './update/update.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { WildcardComponent } from './wildcard/wildcard.component';

@NgModule({
  declarations: [
    // List of component declarations
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    LoginComponent,
    ProfileComponent,
    LoadingComponent,
    AboutComponent,
    ContactComponent,
    MovieDetailsComponent,
    FavouriteComponent,
    LogoutComponent,
    SearchComponent,
    FooterComponent,
    UpdateComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    WildcardComponent,
  ],
  imports: [
    // List of imported modules
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
