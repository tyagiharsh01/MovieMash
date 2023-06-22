import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { GetMovieDetailsService } from '../services/get-movie-details.service';
import { ImagePathService } from '../services/image-path.service';
import { Router } from '@angular/router';
import { FavouritesService } from '../services/favourites.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  check: boolean = false;
  nameValue: any;
  imagePath: any;
  loginCheck = false;
  searchResult: any;
  searchForm = new FormGroup({
    'movieName': new FormControl(null)
  });
  flag: boolean = false;
  showDropdown: boolean = false;
  isContainerOpen: boolean = false;
  searchResultValue: any;
  searchFormValue = new FormGroup({
    'movieName': new FormControl(null)
  });

  imageSrc:SafeUrl='';
  searchBarActive: boolean = false;
  dropdownActive: boolean = false; // Add dropdownActive property

  constructor(
    private login: LoginService,
    private search: GetMovieDetailsService,
    private router: Router,
    private img: ImagePathService,
    private fav : FavouritesService,
    private sanitizer:DomSanitizer
  ) { }

  ngOnInit() {
    this.nameValue = localStorage.getItem('name');
    if (this.nameValue != null || this.nameValue != undefined) {
      this.loginCheck = true;
    }
    this.getUser();

    this.fav.getProfileImg().subscribe((data:any)=>{
      if(data && data.imageData){
        const imageData = data.imageData;
        const binaryData = atob(imageData);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        const blob = new Blob([uint8Array], { type: 'image/png' });
        this.imageSrc = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      }
    })
  }

  getUser() {
    this.login.getuser().subscribe(
      (response: any) => {
        this.imagePath = response?.imagePath;
      }
    );
  }

  submitForm() {
    this.search.getSearchMovie(this.searchForm.value).subscribe((result) => {
      this.searchResult = result.results;
    });
  }

  logout() {
    this.flag = window.confirm('Are you sure you want to logout?');
    if (this.flag) {
      this.login.guard = true;
      localStorage.clear();
      this.router.navigateByUrl("logout");
    }
  }

  toggleContainer() {
    this.isContainerOpen = !this.isContainerOpen;
  }

  sendValues() {
    this.router.navigate(['/search', this.searchFormValue.value.movieName]);
    setTimeout(() => {
      location.reload();
    }, 100);
  }

  toggleSearchBar() {
    this.searchBarActive = !this.searchBarActive;
  }

  toggleDropdown(dropdownActive: boolean) {
    this.dropdownActive = dropdownActive; // Set the value
  }
}
