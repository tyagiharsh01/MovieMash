import { Component } from '@angular/core';
import { GetMovieDetailsService } from '../services/get-movie-details.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(private search: GetMovieDetailsService, private router : ActivatedRoute) { }
  paramValue:any;
  searchResult:any = [];
  ngOnInit(): void {

    this.router.paramMap.subscribe(params => {
      this.paramValue = params.get('movieName');
      // Use the paramValue in your component logic...
    });
    console.log(this.paramValue)
    this.submitForm(this.paramValue)
  }
  submitForm(searchForm: any) {
    console.log(searchForm, 'searchform#');
    this.search.getSearchMovie({ movieName: searchForm }).subscribe((result) => {
      console.log(result, 'searchmovie##');
      this.searchResult = result.results;
    });
  }
}
