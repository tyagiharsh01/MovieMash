import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {
  constructor(private login:LoginService, private router : Router){}

  showSnackbar(message: string, type: string): void {
    const snackbar = document.createElement("div");
    snackbar.id = "snackbar";
    snackbar.textContent = message;
    snackbar.style.backgroundColor = "red"; // Change the background color here
    snackbar.style.color = "#ffffff"; // Change the text color here
    snackbar.style.position = "fixed";
    snackbar.style.bottom = "20px";
    snackbar.style.left = "50%";
    snackbar.style.transform = "translateX(-50%)";
    snackbar.style.padding = "10px 20px";
    snackbar.style.borderRadius = "4px";
    snackbar.style.zIndex = "9999";
    document.body.appendChild(snackbar);
  
    setTimeout(() => {
      snackbar.remove();
    }, 3000);
  }
  


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(localStorage.getItem('name') != null || localStorage.getItem('name') != undefined){
      return true;
    }
    else{
      this.showSnackbar("Please login to access this page.", "error");
      setTimeout(() => {
        this.router.navigateByUrl("login");
      }, 1000);
      return false;
    }
  }
}
