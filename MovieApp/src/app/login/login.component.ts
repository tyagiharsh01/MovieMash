import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ImagePathService } from '../services/image-path.service';
import { FavouritesService } from '../services/favourites.service';
import { CustomValidator } from './customValidator';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  public uploadedImage:any=File;
  loginData!: FormGroup;
  registrationData!: FormGroup;


  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private dialog: MatDialog,
    private login: LoginService, private router: Router, private fav: FavouritesService) {
    this.loginDetails();
    this.setValues();
  }


  loginDetails() {
    this.loginData = this.fb.group({
      email: ["", [Validators.required, this.checkIfGuestEmailsAreValid, Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/)]],
      password: ["", [Validators.minLength(4), Validators.required]]
    })
  }

  get emailValue() { return this.loginData.get('email') };
  get passwordValue() { return this.loginData.get('password') };


  setValues() {
    this.registrationData = this.fb.group({
      name: ["",  [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.maxLength(30)]],
      email: ["", [Validators.required, this.checkIfGuestEmailsAreValid, Validators.pattern(/^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/)]],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
      confirmPassword: ["", [Validators.required]],
      phoneNo: ["", [Validators.required, Validators.pattern(/^[789]\d{9,9}$/)]],
      imagePath: [""],
    }, { validators: [CustomValidator.mustMatchValidator] })
  }
  get name() { return this.registrationData.get("name") }
  get email() { return this.registrationData.get("email") }
  get password() { return this.registrationData.get("password") }
  get confirmPassword() { return this.registrationData.get("confirmPassword") }
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

  public onImageUpload(event:any) {
    const userImg = event.target.files[0];
     console.log(userImg);
     this.uploadedImage = userImg;
     
   }



  registeration() {
    const formData: FormData = new FormData();
    const userData = this.registrationData.value;
    formData.append('UserData',JSON.stringify(userData));
    formData.append('image',this.uploadedImage);

    this.login.register(formData).subscribe(
      {
        next:data=>{
          console.log(data);
          this._snackBar.open('Account created successfully.....', 'success', {
            duration: 3000,
            panelClass: ['mat-toolbar', 'blue']
          });
        
        },
        error(err) {
            alert("Something went wrong")
        },
      }
    
    );
  }


  values: any = [];
  tokenData: any;

  loginValidation() {
    this.login.loginCheck(this.loginData.value).subscribe(
      response => {
        this.values = response;
        this.tokenData = this.values.token;
        localStorage.setItem('jwt', this.tokenData);
        localStorage.setItem('name', this.values.Name);
        localStorage.setItem('path', this.values.ImagePath);
        localStorage.setItem('email',this.values.email);
        alert(`Logged In Successfully!`);
        this.router.navigateByUrl('').then(() => {
          window.location.reload();
        });
      },
      error => {
        alert(`Invalid UserId or Password! \nPlease try again!!!`);
      }
    )
  }

  goToF_Pass(){
    const dialogRef: MatDialogRef<ForgotPasswordComponent> = this.dialog.open(ForgotPasswordComponent, {
      width: '400px',
      disableClose: false,
      data: {
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
}
