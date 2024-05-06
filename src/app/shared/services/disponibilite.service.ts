import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DisponibiliteService {
  private disponibiliteSubject = new BehaviorSubject<string>('disponible'); 
  disponibilite$ = this.disponibiliteSubject.asObservable();

  constructor() { }

  mettreAJourDisponibilite(disponibilite: string) {
    this.disponibiliteSubject.next(disponibilite);
  }
}
