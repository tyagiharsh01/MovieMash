import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : HttpClient) { }
  public flag:boolean = false;
  public guard:boolean = false;
  public name:string = "";

  baseUrl = "http://localhost:4040/movie/api/v1";
  url="http://localhost:4040/api/v1/login";

  register(registrationData: FormData): Observable<any> {
    return this.http.post<any>(this.baseUrl+"/addUser", registrationData);
  }

  loginCheck(data:any){
    return this.http.post(this.url,data);
  }


  getuser() {
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    });
    let requestOptions = { headers: httpHeaders }
    return this.http.get(this.baseUrl + "/get", requestOptions);
  }

  getUserByEmail(email:string){
    return this.http.get(this.baseUrl+"/getBy/"+email);
  }

  updateuser(recorddata: any) {
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    });
    let requestOptions = { headers: httpHeaders }
    return this.http.post(this.baseUrl + "/update", recorddata, requestOptions);
  }

  resetPassword(email:string, password:string){
    let httpHeaders = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('jwt')
    });
    let requestOptions = { headers: httpHeaders }
    return this.http.post("http://localhost:4040/movie/api/v1/updatePassword/"+email+"/"+password, requestOptions, { responseType: 'text' });
  }
}
