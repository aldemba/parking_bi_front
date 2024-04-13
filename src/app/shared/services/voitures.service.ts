import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoituresService {

  constructor(private http: HttpClient) { }



  // public changeState(body:any,id: number)
  // {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //     'Content-type': 'application/merge-patch+json'
  //     })
  //   };
  //   let Cars_URL = "http://127.0.0.1:8000/api/voitures/"+id
    
  //   return this.http.patch<any>(Cars_URL,body,httpOptions).pipe( catchError(this.handleError))
  //   // console.log(this.http.get<any>(PARKINGS_PROPRIO, httpOptions));
    

  // }

  changeState(voiture: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/merge-patch+json'
      })
    };
    const voitureId = voiture.id; // Assurez-vous que votre objet voiture contient un identifiant unique.
    const updateUrl = `http://127.0.0.1:8000/api/voitures/${voitureId}`;
    return this.http.patch(updateUrl, { etat: voiture.etat }, httpOptions).pipe(
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
