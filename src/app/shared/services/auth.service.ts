import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import { User } from '../models/user';
import { Credentials } from '../models/credentials';
import { Token } from '../models/token';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private  url :string= environment.api
   urlLogin=`${this.url}/login_check`

  user:User|undefined
  tok:any

  //  url="http://localhost:8000/api/login_check"


  constructor(private http:HttpClient, private tokenserv:TokenService, private router:Router) { }

  public hasRole(role: string){ return this.user?.roles?.includes(role as never); }


  public async login(body : Credentials)
  {
    return await firstValueFrom(
      this.http.post<Token>(this.urlLogin, body).pipe(
        catchError( error => {            
          if(error.status == 401){

            // console.log("Login et/ou mot de passe incorrect(s)!")
          }
          return throwError(() => ("Login et/ou mot de passe incorrect(s)!"))
        })
      )
    ).then((data) => 
    { 
      this.tokenserv.saveTokenInStorage(data.token);
      this.user=(this.tokenserv.getUser(data.token));
      // var id=this.tokenserv.getIdFromToken(data.token);
      this.tok=this.tokenserv.getIdFromToken(data.token)
      // console.log(this.tok.id);
      
    //  console.log("user",this.user);
      
      this.tokenserv.saveIdInStorage(this.tok.id);

      this.tokenserv.saveNomInStorage(this.tok.nom);

      this.tokenserv.savePrenomInStorage(this.tok.prenom);




      // this.tokenserv.saveToken(data.token)  ;  

      // this.user = (this.tokenserv.getUser(data.token));
      // console.log(this.user);
      
      // this.userserv.getClientId().then(m =>
      //   this.tokenserv.saveId(m)        
      // );
            
       (this.hasRole("ROLE_PROPRIETAIRE")) ?  this.router.navigate(["/admin/parkings"]) : this.router.navigate(["/superadmin/accueil"])
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
