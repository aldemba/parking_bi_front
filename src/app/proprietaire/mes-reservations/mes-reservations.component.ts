import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/shared/models/reservation';
import { LocationService } from 'src/app/shared/services/location.service';
import { ParkingsService } from 'src/app/shared/services/parkings.service';
import { TokenService } from 'src/app/shared/services/token.service';

@Component({
  selector: 'app-mes-reservations',
  templateUrl: './mes-reservations.component.html',
  styleUrls: ['./mes-reservations.component.css']
})
export class MesReservationsComponent {

 
reservations:any;


constructor(private activatedroute:ActivatedRoute,private locationsserv:LocationService,private tokserv:TokenService,private parkserv:ParkingsService, private router:Router){

}


ngOnInit() {
  // let id=0;
  // this.activatedroute.paramMap.subscribe(
  //   param=> {
  //     id=+param.get("id")!;

  //     this.locationsserv.getReservationsByParking(id).subscribe((data)=> {
  //       this.reservations=data;
  //       console.log(data);
        

  //     })
  //   }
  // )
  
   
  let idClientConnecté: any;
  const idFromStorage = this.tokserv.getIdFromStorage();
  if (idFromStorage !== null && idFromStorage !== undefined) {
      idClientConnecté = +idFromStorage;
  }
  
  this.parkserv.getParkingsById(+idClientConnecté).subscribe(data=>{
    this.reservations=data.allReservations
    console.log(this.reservations);
  })

  
}


redirectToEditR(idr: number) {
  this.router.navigate(["/admin/parkings/reservations/edit/" + idr]);
}


}
