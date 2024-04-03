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

  getIdFromToken(token:string){
  
  const payload = token.split('.')[1];

  const decodedPayload = atob(payload);

  const payloadObj = JSON.parse(decodedPayload);

  const id = payloadObj.id;

  return id

  }


 getUser(token: string){  return JSON.parse(atob(token.split(".")[1]))}



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
