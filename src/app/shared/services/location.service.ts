import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  private addReservation:string="http://127.0.0.1:8000/api/reservations"




  editLocation(body:Reservation, locationId:number):Observable<any>{
  
    return this.http.patch<any>(`http://127.0.0.1:8000/api/reservations/${locationId}`,body).pipe(catchError(this.handleError));

  }



  saveLocation(body:Reservation):Observable<any>{
    return this.http.post<Reservation>(this.addReservation,body).pipe(catchError(this.handleError));
  } 




  public getReservationsByParking(id:number){
    let RESERV_URL = "http://127.0.0.1:8000/api/proprietaire/"+id+"/parkings"
    
    return this.http.get<any>(RESERV_URL).pipe( catchError(this.handleError))
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
