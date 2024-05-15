import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(private http:HttpClient, private tokserv:TokenService) { }


  public getVoituresByParking(id: number)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/problem+json',
        'Authorization': `Bearer ${this.tokserv.getTokenFromStorage()}`
      })
    };
    let DETAILS_URL = "http://127.0.0.1:8000/api/details/"+id
    
    return this.http.get<any>(DETAILS_URL)
    // console.log(this.http.get<any>(PARKINGS_PROPRIO, httpOptions));
    

  }


  // public getVoituresByParking(slug: string)
  // {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json',
  //       'Authorization': `Bearer ${this.tokserv.getTokenFromStorage()}`
  //     })
  //   };
  //   let DETAILS_URL = "http://127.0.0.1:8000/api/parkings/"+slug+"/voitures"
    
  //   return this.http.get<any>(DETAILS_URL, httpOptions).pipe( catchError(this.handleError))
  //   // console.log(this.http.get<any>(PARKINGS_PROPRIO, httpOptions));
    

  // }

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
