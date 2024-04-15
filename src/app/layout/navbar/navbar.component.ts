import { Component, Input } from '@angular/core';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  dropdownOpen: boolean = false;

  @Input() user:any;


  constructor(private tokserv:TokenService){}


  logout() {
    this.tokserv.clearTokenAndId();
  }

}
