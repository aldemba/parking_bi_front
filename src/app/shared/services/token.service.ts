import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor(private router:Router) { }

    
  saveIdInStorage(id: number){  localStorage.setItem("id",id.toString());    }

  getIdFromStorage(){  return localStorage.getItem("id");    }

  saveTokenInStorage(token: string){  localStorage.setItem("token", token);    }

  getTokenFromStorage(): string | null{  return localStorage.getItem("token") }


  isLogged():boolean{

    const token=localStorage.getItem('token')

    return !!token
  }


  clearTokenAndId()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    // location.reload();
     this.router.navigate(["security/login"])
  }





}
