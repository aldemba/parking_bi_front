import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionReservationService {


  constructor(private http:HttpClient) { }



  private idSubject= new BehaviorSubject<any>([]);

  idObservable$=this.idSubject.asObservable();

  setR(id:any): void {
    this.idSubject.next(id);
  }




  changeState(reservation: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/merge-patch+json'
      })
    };
    const reservationId = reservation.id; // Assurez-vous que votre objet reservation contient un identifiant unique.
    // alert(reservationId)
    const updateUrl = `http://127.0.0.1:8000/api/reservations/${reservationId}`;
    return this.http.patch(updateUrl, { etat: reservation.etat }, httpOptions).pipe(
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
