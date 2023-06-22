import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  constructor(private router: Router){}
  ngOnInit() {
    // do init at here for current route.

    setTimeout(() => {
        this.router.navigate(['profile']);
    }, 7000);  //5s
}
back()
{
  this.router.navigateByUrl("");
}
}
