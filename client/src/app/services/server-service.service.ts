import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserModel } from 'src/app/Model/UserModel';

@Injectable({
  providedIn: 'root'
})
export class ServerServiceService {

  port =3000;
  userApi:string = `http://localhost:${this.port}/user`;
  private headers=new HttpHeaders({'Content-Type':'application/json'})
  constructor(private http: HttpClient) { }

  SignUp(User:UserModel):Observable<any>{
    return this.http.post(`${this.userApi}/add`,
    JSON.stringify(User),{headers:this.headers})
    .pipe(map((res:any)=><any>res));
    }
    
  LogIn(User:UserModel):Observable<any>{
      return this.http.post(`${this.userApi}/login`,
    JSON.stringify(User),{headers:this.headers})
    .pipe(map((res:any)=><any>res));
    }
}
