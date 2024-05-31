import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Reservation } from '../models/reservation';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  private addReservation:string=`${environment.api}/reservations`




  editLocation(body:Reservation, locationId:number):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/merge-patch+json'
      })
    };
    return this.http.patch<any>(`${environment.api}/reservations/${locationId}`,body,httpOptions).pipe(catchError(this.handleError));

  }



  saveLocation(body:Reservation):Observable<any>{
    return this.http.post<Reservation>(this.addReservation,body).pipe(catchError(this.handleError));
  } 




  public getReservationsByParking(id:number){
    // let RESERV_URL = "http://127.0.0.1:8000/api/proprietaire/"+id+"/parkings"
    let RESERV_URL=`${environment.api}/api/proprietaire/${id}/parkings`
    
    return this.http.get<any>(RESERV_URL).pipe( catchError(this.handleError))
  }

  
  getReservationById(reservationId:number):Observable<any>{
    return this.http.get<any>(`${environment.api}/reservations/${reservationId}`).pipe(  
    catchError(this.handleError)
    )
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
