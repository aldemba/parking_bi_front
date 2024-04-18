import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isVisible:boolean = false;
  @Output() clickchanged: EventEmitter<string>=new EventEmitter

  prenom:string|null=null;
  nom:string|null=null;

  @Input() user:any;


  constructor(private tokserv:TokenService, private router: Router){}

  ngOnInit() {
    this.isVisible=this.router.url.includes("voitures")
    // console.log("nom",this.tokserv.getNomFromStorage());
    this.getNom();
    this.getPrenom();
    
  }

  logout() {
    this.tokserv.clearTokenAndId();
  }

  filterCar(value:string){
    this.clickchanged.emit(value)
    }
    
    getPrenom(){
      this.prenom=this.tokserv.getPrenomFromStorage()
    }

    getNom(){
      this.nom=this.tokserv.getNomFromStorage()
    }

}
