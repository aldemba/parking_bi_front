import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class ParkingsService {

  constructor(private http: HttpClient,private toksev:TokenService) { }

  public getParkingsById(id: number)
  {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.toksev.getTokenFromStorage()}`
      })
    };
    let PARKINGS_PROPRIO = "http://127.0.0.1:8000/api/proprietaire/"+id+"/parkings"
    
    return this.http.get<any>(PARKINGS_PROPRIO).pipe( catchError(this.handleError))
    // console.log(this.http.get<any>(PARKINGS_PROPRIO, httpOptions));
    
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
