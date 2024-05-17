import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GestionReservationService {


  private idSubject= new BehaviorSubject<any>([]);

  idObservable$=this.idSubject.asObservable();

  setR(id:any): void {
    this.idSubject.next(id);
  }

  constructor() { }
}
