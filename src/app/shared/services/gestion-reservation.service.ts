import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionReservationService {


  private idSubject= new BehaviorSubject<number|0>(0);

  idObservable$=this.idSubject.asObservable();

  setId(id:number): void {
    this.idSubject.next(id);
  }

  constructor() { }
}
