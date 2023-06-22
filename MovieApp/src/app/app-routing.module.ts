import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { LoadingComponent } from './loading/loading.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { LogoutComponent } from './logout/logout.component';
import { SearchComponent } from './search/search.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { AppComponent } from './app.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { WildcardComponent } from './wildcard/wildcard.component';


export const routes: Routes = [
{ "path": "", component: DashboardComponent},
{ "path": "login", component: LoginComponent },
{ "path": "profile", component: ProfileComponent ,canActivate:[LoggedInGuard]},
{ "path": "loader", component: LoadingComponent },
{ "path": "about", component: AboutComponent },
{ "path": "contact", component: ContactComponent },
{ "path": "movie-details/:id", component: MovieDetailsComponent ,canActivate:[LoggedInGuard]},
{ "path": "fav", component: FavouriteComponent, canActivate:[LoggedInGuard]},
{ "path": "logout", component: LogoutComponent },
{ "path": 'search/:movieName', component: SearchComponent },
{ "path": "f_pass", component : ForgotPasswordComponent},
{ "path": "resetPass", component: ResetPasswordComponent},
{ "path": "**", component: WildcardComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
