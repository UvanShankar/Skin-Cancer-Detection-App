import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  rooturl="https://skin-cancer-detector-api-api.herokuapp.com/auth";
  constructor(private http:HttpClient) { }
 loginuser(usernameparam:string,passwordparam:string):Observable<any>{
  const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    
    let body={
      username:usernameparam,
      password:passwordparam
    };
    console.log("Jsonify",JSON.stringify(body));
 return this.http.post(this.rooturl,JSON.stringify(body),{headers: headers})
 .pipe(map(res=>{console.log("users",res)}));
  }
}

 