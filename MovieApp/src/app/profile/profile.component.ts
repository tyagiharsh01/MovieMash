import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UpdateComponent } from '../update/update.component';
import { LoginService } from '../services/login.service';
import { FavouritesService } from '../services/favourites.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  constructor(private _dialog: MatDialog, 
    private login:LoginService,
    private fav : FavouritesService,
    private sanitizer:DomSanitizer) { }
  imagePath: string | any = "";
  showToolTip:boolean = false;

  values: any = [];
  imageSrc:SafeUrl='';
  ngOnInit() {
    this.getdetail();

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

  getdetail() {
    this.login.getuser().subscribe(
      data => {
        this.values = data;
      }
    )
  }

  edit(data: any) {
    const dialogRef = this._dialog.open(UpdateComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getdetail();

        }
      },
    });
  }

  show(){
    this.showToolTip = !this.showToolTip;
  }
}
