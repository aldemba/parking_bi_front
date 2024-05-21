import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private tokserv:TokenService,private router:Router){}

  nom:string|null=""
  prenom:string|null=""
  id: number = 0;

    
  ngOnInit(){
  this.nom=this.getNom()
  this.prenom=this.getPrenom()
  this.getId();
  }


  logout() {
    this.tokserv.clearTokenAndId();
  }


  redirectToUser(){
    this.router.navigate(["/superadmin/users"])
  }

  redirectToAccueil(){
    this.router.navigate(["/superadmin/accueil"])
  }

  getNom(){
    return localStorage.getItem("nom")
  }

  getPrenom(){
    return localStorage.getItem("prenom")
  }

  getId() {
    this.id = +this.tokserv.getIdFromStorage()!
  }


  miseAjourPassword() {
    this.router.navigate(["/superadmin/users/update-password/" + this.id])
  }

}
