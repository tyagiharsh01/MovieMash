import { Component } from '@angular/core';
import { GetMovieDetailsService } from '../services/get-movie-details.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  typeof(arg0: any): any {
    throw new Error('Method not implemented.');
  }
  constructor(private getMovieDetails: GetMovieDetailsService, private router: Router) { }
  movieList: any = [];
  actionMovies: any = [];
  comedyMovies: any = [];
  animatedMovies: any = [];
  documentaryMovies: any = [];
  scienceFictionMovies: any = [];
  thrillerMovies: any = [];
  nameValue:any;
  showHeaderText:boolean = false;
  profileCheck:boolean = false;
  video!: HTMLVideoElement;

  ngOnInit() {
    this.getMovies();
    this.getActionMovies();
    this.getComedyMovies();
    this.getanimatedMovies();
    this.getdocumentaryMovies();
    this.getscienceFictionMovies();
    this.getThrillerMovies();
    this.nameValue = localStorage.getItem('name');
    if(this.nameValue != null || this.nameValue != undefined)
    {
      this.profileCheck= true;
    }

    setTimeout(() => {
      this.showHeaderText = true;
    }, 1000);

    this.video = document.getElementById('video') as HTMLVideoElement;
    this.video.muted = true;
  }

  isSidebarExpanded: boolean = false;

  expandSidebar(): void {
    this.isSidebarExpanded = true;
  }

  collapseSidebar(): void {
    this.isSidebarExpanded = false;
  }



  getMovies() {
    this.getMovieDetails.getMovies().subscribe(
      response => {
        this.movieList = response;
        this.movieList = this.movieList.results;
      }
    )
  }
  getActionMovies() {
    this.getMovieDetails.fetchActionMovies().subscribe(
      response => {
        this.actionMovies = response;
        this.actionMovies = this.actionMovies.results;
        console.log(this.actionMovies);

      }
    )
  }
  go(item: any) {
    this.getMovieDetails.item = item;
    this.router.navigateByUrl("movieDetails");
  }
  getComedyMovies() {
    this.getMovieDetails.fetchComedyMovies().subscribe(
      response => {
        this.comedyMovies = response;
        this.comedyMovies = this.comedyMovies.results;
      }
    )
  }
  getanimatedMovies() {
    this.getMovieDetails.fetchAnimationMovies().subscribe(
      response => {
        this.animatedMovies = response;
        this.animatedMovies = this.animatedMovies.results;
      }
    )
  }
  getdocumentaryMovies() {
    this.getMovieDetails.fetchDocumentaryMovies().subscribe(
      response => {
        this.documentaryMovies = response;
        this.documentaryMovies = this.documentaryMovies.results;
      }
    )
  }
  getscienceFictionMovies() {
    this.getMovieDetails.fetchScienceFictionMovies().subscribe(
      response => {
        this.scienceFictionMovies = response;
        this.scienceFictionMovies = this.scienceFictionMovies.results;
      }
    )
  }
  getThrillerMovies() {
    this.getMovieDetails.fetchThrillerMovies().subscribe(
      response => {
        this.thrillerMovies = response;
        this.thrillerMovies = this.thrillerMovies.results;
      }
    )
  }

  mute:boolean = true;
  toggleMute() {
    this.video.muted = !this.video.muted;
    if(this.video.muted == true){
      this.mute = true;
    }
    else{
      this.mute = false;
    }
  }

}
