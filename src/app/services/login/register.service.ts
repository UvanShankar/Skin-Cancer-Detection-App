import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  rooturl="https://skin-cancer-detector-api-api.herokuapp.com/register";
  constructor(private http:HttpClient) { }
 registeruser(usernameparam:string,passwordparam:string,emailIdparam:string):Observable<any>{
  const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    let headerreq=new HttpHeaders();
    headerreq.append('Content-Type','application/json');
    let body={
      username:usernameparam,
      password:passwordparam,
      emailId:emailIdparam,
      requests:0,
      premium:"no"
    };
    console.log("Jsonify",JSON.stringify(body));
 return this.http.post(this.rooturl,JSON.stringify(body),{headers: headers})
 .pipe(map(res=>{console.log("users",res)}));
 
  }
}

 