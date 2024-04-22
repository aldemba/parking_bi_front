import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoituresService {

  constructor(private http: HttpClient) { }

  private addCarUrl:string="http://127.0.0.1:8000/api/voitures"


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


  changeVisibility(voiture: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/merge-patch+json'
      })
    };
    const voitureId = voiture.id; // Assurez-vous que votre objet voiture contient un identifiant unique.
    const updateUrl = `http://127.0.0.1:8000/api/voitures/${voitureId}`;
    return this.http.patch(updateUrl, { isVisible: false }, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  
  public getVoituresByEtat(id: number): Observable<any> {
    let DETAILS_URL = "http://127.0.0.1:8000/api/parkings/"+id+"/voitures";
    
    return this.http.get<any>(DETAILS_URL).pipe(
      map((response) => {
        // Filtrer les voitures disponibles et indisponibles
        const voituresDisponibles = response.voitures.filter((voiture: any) => voiture.etat === 'DISPONIBLE');
        const voituresIndisponibles = response.voitures.filter((voiture: any) => voiture.etat == 'INDISPONIBLE');
        
        // Fonction pour mapper les données de voiture
        const mapVoitureData = (voiture: any) => ({
          id: voiture.id,
          nom: voiture.nom,
          modele: voiture.modele,
          categorie: voiture.categorie,
          marque: voiture.marque,
          matricule: voiture.matricule,
          date_fin_visite: voiture.visite ? voiture.visite.date_fin_visite : null,
          date_fin_assurance: voiture.assurance ? voiture.assurance.date_fin : null,
          image: voiture.image,
          etat: voiture.etat,
        });
        
        // Mapping des données pour les voitures disponibles
        const voituresDisponiblesMapped = voituresDisponibles.map(mapVoitureData);
        
        // Mapping des données pour les voitures indisponibles
        const voituresIndisponiblesMapped = voituresIndisponibles.map(mapVoitureData);
        
        return {
          disponibles: voituresDisponiblesMapped,
          indisponibles: voituresIndisponiblesMapped,
          all:[...voituresDisponibles,...voituresIndisponiblesMapped]
        };
      }),
      catchError(this.handleError)
    );
  }

  editCar(body:any, voitureId:number):Observable<any>{
    // const voitureId = voitureData.id; // Assurez-vous que votre objet voiture contient un identifiant unique.
    // const CarUrl = `http://127.0.0.1:8000/api/voitures/${voitureId}`;
    return this.http.put<any>(`http://127.0.0.1:8000/api/voitures/${voitureId}`,body).pipe(catchError(this.handleError));
  }


  saveCar(body:any):Observable<any>{
    return this.http.post<any>(this.addCarUrl,body).pipe(catchError(this.handleError));
  } 


  getVoitureById(voitureId:number):Observable<any>{
    return this.http.get<any>(`http://localhost:8000/api/voitures/${voitureId}`).pipe(  
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
