import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/shared/models/reservation';
import { LocationService } from 'src/app/shared/services/location.service';
import { ParkingsService } from 'src/app/shared/services/parkings.service';
import { TokenService } from 'src/app/shared/services/token.service';
import { VoituresService } from 'src/app/shared/services/voitures.service';

@Component({
  selector: 'app-mes-reservations',
  templateUrl: './mes-reservations.component.html',
  styleUrls: ['./mes-reservations.component.css']
})
export class MesReservationsComponent {

 
reservations:any;

idp:number|0=0

loading: boolean = true; 

updatedReservations: Set<number> = new Set<number>();



constructor(private activatedroute:ActivatedRoute,private locationsserv:LocationService,private tokserv:TokenService,private parkserv:ParkingsService, private router:Router, private voitureService: VoituresService){

}


ngOnInit() {

this.idp= +localStorage.getItem("idP")!;


  
  
   
  let idClientConnecté: any;
  const idFromStorage = this.tokserv.getIdFromStorage();
  if (idFromStorage !== null && idFromStorage !== undefined) {
      idClientConnecté = +idFromStorage;
  }
  
  this.parkserv.getParkingsById(+idClientConnecté).subscribe(data=>{
    // this.reservations=data.allReservations
   this.reservations=data.allReservations.filter((r:any) => r.voiture.parking==this.idp)
  //  this.reservations=this.reservations.filter((r:any) => r.voiture.etat="INDISPONIBLE")

   this.loading=false;

    console.log(this.reservations);
  // }),(error:any)=>{
  //   this.loading=false;
  // }

  this.reservations.forEach((reservation: any) => {
    this.updateCarStateIfExpired(reservation);
  });



 this.reservations = this.reservations.filter((r: any) => new Date(r.date_fin_reservation) > new Date());

}, (error: any) => {
  this.loading = false;
});



  


}




redirectToEditR(idr: number) {
  this.router.navigate(["/admin/parkings/reservations/edit/" + idr]);
}

getIdParking():string|null{
 return localStorage.getItem("idP");
}

goBack() {
  this.router.navigate(["/admin/parkings/"+this.idp+"/voitures"]);

}

updateCarStateIfExpired(reservation: any) {
  const currentDate = new Date();
  const endDate = new Date(reservation.date_fin_reservation);

  
  
  // console.log('Current Date:', currentDate);
  // console.log('End Date:', endDate);
  // console.log(typeof endDate)

  if (endDate <= currentDate) {
    // Mettez à jour l'état de la voiture.
    const voitureToUpdate = {
      id: reservation.voiture.id, // Assurez-vous que cet objet contient un identifiant unique.
      etat: 'DISPONIBLE' // Vous pouvez ajuster cette valeur selon vos besoins.
    };

    // Appelez la méthode changeState de VoituresService pour mettre à jour l'état de la voiture.
    this.voitureService.changeState(voitureToUpdate).subscribe(
      () => {
        console.log('État de la voiture mis à jour avec succès.');
      },
      (error:any) => {
        console.error('Une erreur est survenue lors de la mise à jour de l\'état de la voiture : ', error);
      }
    );
  }
}

// updateCarStateIfExpired(reservation: any) {
//   const reservationId = reservation.id;

//   // Vérifie si la réservation a déjà été mise à jour
//   if (this.updatedReservations.has(reservationId)) {
//     console.log(`La réservation ${reservationId} a déjà été mise à jour. Ignorée.`);
//     return;
//   }

//   const currentDate = new Date();
//   const endDate = new Date(reservation.date_fin_reservation);

//   if (endDate <= currentDate) {
//     const voitureToUpdate = {
//       id: reservation.voiture.id,
//       etat: 'DISPONIBLE'
//     };

//     this.voitureService.changeState(voitureToUpdate).subscribe(
//       () => {
//         console.log('État de la voiture mis à jour avec succès.');
//         // Ajoute l'identifiant de la réservation à la liste des réservations mises à jour
//         this.updatedReservations.add(reservationId);
//       },
//       (error:any) => {
//         console.error('Une erreur est survenue lors de la mise à jour de l\'état de la voiture : ', error);
//       }
//     );
//   }
// }


}
