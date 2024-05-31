import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  private addProprio:string=`${environment.api}/proprietaires`
  // private addUser:string="http://127.0.0.1:8000/api/users"
  private addGestionnaire:string=`${environment.api}/gestionnaires`

  public getUsers():Observable<User>
  {
    return this.http.get<any>(this.addProprio).pipe( catchError(this.handleError))
     
  }

  saveUser(user:User):Observable<User>{
   if(user['@type']=='Gestionnaire'){

     return this.http.post<User>(this.addGestionnaire,user).pipe(catchError(this.handleError));

   }
   return this.http.post<User>(this.addProprio,user).pipe(catchError(this.handleError));
  
  } 

  editUser(user:User, userId:number):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/merge-patch+json'
      })
    };
  
    return this.http.patch<any>(`${environment.api}/users/${userId}`,user,httpOptions).pipe(catchError(this.handleError));

  }


  getUserById(userId:number):Observable<any>{
    return this.http.get<any>(`${environment.api}/users/${userId}`).pipe(  
    catchError(this.handleError)
    )
    
  }


  getProprioById(userId:number):Observable<any>{
    return this.http.get<any>(`${environment.api}/proprietaire/${userId}/parkings`).pipe(  
    catchError(this.handleError)
    )
  
  }


  changeVisibility(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/merge-patch+json'
      })
    };
    const userId = user.id; // Assurez-vous que votre objet voiture contient un identifiant unique.
    const updateUrl = `${environment.api}/users/${userId}`;
    return this.http.patch(updateUrl, { isVisible: false }, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
