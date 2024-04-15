import { Component } from '@angular/core';
import { ParkingsService } from 'src/app/shared/services/parkings.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-mes-parkings',
  templateUrl: './mes-parkings.component.html',
  styleUrls: ['./mes-parkings.component.css']
})
export class MesParkingsComponent {

  parkings:any

  constructor(private tokserv:TokenService, private parkserv:ParkingsService){}

  
  
  ngOnInit(){
    
    let idClientConnecté: any;
    const idFromStorage = this.tokserv.getIdFromStorage();
    if (idFromStorage !== null && idFromStorage !== undefined) {
        idClientConnecté = +idFromStorage;
    }
    // console.log(idClientConnecté);
    

    this.parkserv.getParkingsById(+idClientConnecté).subscribe({next:data =>{
       console.log(data);
      
      this.parkings=data}})
    

    console.log(this.parkings);
    
    



  }


}
