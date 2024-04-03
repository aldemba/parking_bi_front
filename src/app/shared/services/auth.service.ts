import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { User } from '../models/user';
import { Credentials } from '../models/credentials';
import { Token } from '../models/token';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  user:User|undefined

  url="http://localhost:8000/api/login_check"


  constructor(private http:HttpClient, private tokenserv:TokenService) { }

  public hasRole(role: string){ return this.user?.roles?.includes(role as never); }


  public async login(body : Credentials)
  {
    return await firstValueFrom(
      this.http.post<Token>(this.url, body).pipe(
        catchError( error => {            
          if(error.status == 401)
            console.log("Login et/ou mot de passe incorrect(s)!")
          return throwError(() => new Error("Login et/ou mot de passe incorrect(s)!"))
        })
      )
    ).then((data) => 
    {
      this.tokenserv.saveTokenInStorage(data.token);
      this.user=(this.tokenserv.getUser(data.token));
      var id=this.tokenserv.getIdFromToken(data.token);
      this.tokenserv.saveIdInStorage(id)


      // this.tokenserv.saveToken(data.token)  ;  

      // this.user = (this.tokenserv.getUser(data.token));
      // console.log(this.user);
      
      // this.userserv.getClientId().then(m =>
      //   this.tokenserv.saveId(m)        
      // );
            
      // (this.hasRole("ROLE_CLIENT")) ?  this.redirige.navigate(["/client"]) : this.redirige.navigate(["/client/details/1"])
    })
  }





  // private handleError(error: HttpErrorResponse) {
  //   if (error.status === 0) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `, error.error);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(() => new Error('Something bad happened; please try again later.'));
  // }

}
