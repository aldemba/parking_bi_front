import { Component } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {



  constructor(private tokserv:TokenService){}


  logout(){
    this.tokserv.clearTokenAndId();
  }

}
