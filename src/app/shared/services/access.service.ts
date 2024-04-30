import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  private userParkingsSubject = new BehaviorSubject<string[]>([]);
  userParkings$ = this.userParkingsSubject.asObservable();

  constructor() { }

  setUserParkings(parkings: string[]) {
    this.userParkingsSubject.next(parkings);
  }

  
}
