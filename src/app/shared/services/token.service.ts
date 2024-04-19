import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenPayload } from '../models/token-payload';

@Injectable({
  providedIn: 'root'
})
export class TokenService {


  constructor(private router:Router) { }

    
  saveIdInStorage(id: number){  localStorage.setItem("id",id.toString());    }

  getIdFromStorage(){  return localStorage.getItem("id");    }

  saveTokenInStorage(token: string){  localStorage.setItem("token", token);    }

  getTokenFromStorage(): string | null{  return localStorage.getItem("token") }

  // getIdFromToken(token:string){
    
  
  // const payload = token.split('.')[0];
  // console.log(payload);
  

  // const decodedPayload = atob(payload);

  // const payloadObj = JSON.parse(decodedPayload);

  // const id = payloadObj.id;

  // return id

  // }
  savePrenomInStorage(prenom: string){ localStorage.setItem("prenom",prenom)}

  saveNomInStorage(nom: string){ localStorage.setItem("nom",nom)}

  getPrenomFromStorage(){ return localStorage.getItem("prenom")}

  getNomFromStorage(){ return localStorage.getItem("nom")}


 getUser(token: string){  return JSON.parse(atob(token.split(".")[1]))}


 getIdFromToken(token: string):TokenPayload{
  const decodedtoken= JSON.parse(atob(token.split(".")[0]))
  // console.log("decoded",decodedtoken);
  
  return decodedtoken as TokenPayload;
}



  isLogged():boolean{

    const token=localStorage.getItem('token')

    return !!token
  }


  clearTokenAndId()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("nom");
    localStorage.removeItem("prenom");
    this.router.navigate(["security/login"])
  }





}
