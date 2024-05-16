import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { TokenService } from './token.service';
import { Parking } from '../models/parking';

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

  saveParking(parking:Parking):Observable<any>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.toksev.getTokenFromStorage()}`
      })
    };
  let addParking:string=`http://127.0.0.1:8000/api/parkings`

    return this.http.post<Parking>(addParking,parking,httpOptions).pipe
    (catchError(this.handleError));
    
  } 


  editCar(body:Parking, parkingId:number):Observable<Parking>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/merge-patch+json'
      })
    };
    return this.http.patch<Parking>(`http://127.0.0.1:8000/api/parkings/${parkingId}`,body,httpOptions).pipe(catchError(this.handleError));
  }

 
  getParkingById(parkingId:number):Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/api/parkings/${parkingId}`).pipe(  
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
