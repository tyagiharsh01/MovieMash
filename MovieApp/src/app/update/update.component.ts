import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FavouritesService } from '../services/favourites.service';
import { LoginService } from '../services/login.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {



  hide = true;
  hide1 = true;
  values:any = [];
  emailId:any;
  loginData!: FormGroup;
  public uploadedImage:any=File;
  registrationData!: FormGroup;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private _snackBar: MatSnackBar,
  private login: LoginService, private fav: FavouritesService, private dialog: MatDialog) {

    this.setValues();
  }
  ngOnInit(): void {
    if (this.data) {
      this.data.password = "";
      this.registrationData.patchValue(this.data);
    }
    this.emailId = localStorage.getItem('email');
    this.getdetail();
  }

  get emailValue() { return this.loginData.get('email') };
  get passwordValue() { return this.loginData.get('password') };


  setValues() {
    this.registrationData = this.fb.group({
      name: ["", [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(30)]],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
      phoneNo: ["", [Validators.required, Validators.pattern(/^[789]\d{9,9}$/)]],
      imagePath: [[]]
    })
  }
  get name() { return this.registrationData.get("name") }
  get password() { return this.registrationData.get("password") }
  get phoneNo() { return this.registrationData.get("phoneNo") }
  get imagePath() { return this.registrationData.get("imagePath") }

  checkIfGuestEmailsAreValid(c: AbstractControl) {
    if (c.value !== '') {
      const emailString = c.value;
      const emails = emailString.split(',').map((e: string) => e.trim());
      const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      const anyInvalidEmail = emails.every((e: string) => e.match(emailRegex) !== null);
      if (!anyInvalidEmail) {
        return { emailsAreValidCheck: false }
      }
    }
    return;
  }


  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  get passwordType() {
    return this.hide ? 'password' : 'text';
  }


  public onImageUpload(event: any) {
    const userImg = event.target.files[0];
    console.log(userImg);
  
    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result as string;
      const base64Image = imageData.split(',')[1]; // Extract base64 string
      this.registrationData.get('imagePath')?.setValue(base64Image);
    };
    reader.readAsDataURL(userImg);
  }
  

  getdetail() {
    this.login.getuser().subscribe(
      data => {
        this.values = data;
      }
    )
  }


  update() {
    if(this.values.password == this.registrationData.get('password')?.value){
    this.login.updateuser(this.registrationData.value).subscribe(
      (response: any) => {
        this._snackBar.open('Details Successfully Updated!!!', '', {
          duration: 5000,
          panelClass: ['mat-toolbar', 'mat-primary']
        });
        location.reload();
      },
      error => {
        alert('Something Went Wrong! \nPlease try again!!!');
      }
    )
    }
    else{
      alert('Invalid Password!!!');
      location.reload();
    }
  }

  goToFPass(){
    const dialogRef: MatDialogRef<ResetPasswordComponent> = this.dialog.open(ResetPasswordComponent, {
      width: '400px',
      disableClose: false,
      data: {
        password:this.values.password
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}


