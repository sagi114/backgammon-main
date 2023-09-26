import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class IRegisterService {

  //private baseUrl=`http://localhost:${this.port}`;
  //private headers=new HttpHeaders({'Content-Type':'application/json'})

  // constructor(private http: HttpClient) { }
  // LogInUser(User:UserModel):Observable<Guid>{
  //   console.log(User)
  //   return this.http.post(`${this.baseUrl}/LogIn`,
  //   JSON.stringify(User),{headers:this.headers})
  //   .pipe(map((res:any)=><Guid>(res)));
  //   }
}
