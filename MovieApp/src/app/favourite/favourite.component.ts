import { Component } from '@angular/core';
import { FavouritesService } from '../services/favourites.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent {
  constructor(private fav: FavouritesService) { this.displayFav();// Add this code in the component where you want to navigate from
  window.scrollTo(0, 0); }
  favList: any = [];
  ngOnInit() {

  }
  displayFav() {
    this.fav.getAllFavMovies().subscribe(
      response => {
        this.favList = response;
      },
      error => {
        alert(`hello`);
      }
    )
  }
}
