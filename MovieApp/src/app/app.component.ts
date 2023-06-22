import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ImagePathService } from './services/image-path.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MovieApp';
  shouldShowNavbar: boolean;

  constructor(private router: Router) {
    this.shouldShowNavbar = true; // Show the navbar by default

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.shouldShowNavbar = !event.url.includes('#');
      }
    });
  }

}
