import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from 'src/app/shared/models/reservation';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-mes-reservations',
  templateUrl: './mes-reservations.component.html',
  styleUrls: ['./mes-reservations.component.css']
})
export class MesReservationsComponent {

 
  reservations:Reservation|undefined;


constructor(private activatedroute:ActivatedRoute,private locationsserv:LocationService){

}


ngOnInit() {
  let id=0;
  this.activatedroute.paramMap.subscribe(
    param=> {
      id=+param.get("id")!;

      this.locationsserv.getReservationsByParking(id).subscribe((data)=> {
        this.reservations=data;
        console.log(data);
        

      })
    }
  )

}


}
