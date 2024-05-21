import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/shared/models/reservation';
import { GestionReservationService } from 'src/app/shared/services/gestion-reservation.service';
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

allReserv:any

idp:number|0=0

loading: boolean = true; 

reservSelect: any;



constructor(private activatedroute:ActivatedRoute,private locationsserv:LocationService,private tokserv:TokenService,private parkserv:ParkingsService, private router:Router, private voitureService: VoituresService, private gestionreserv:GestionReservationService){

}


ngOnInit() {

this.idp= +localStorage.getItem("idP")!;


  
  
   
  let idClientConnecté: any;
  const idFromStorage = this.tokserv.getIdFromStorage();
  if (idFromStorage !== null && idFromStorage !== undefined) {
      idClientConnecté = +idFromStorage;
  }
  
  this.parkserv.getParkingsById(+idClientConnecté).subscribe(data=>{
   this.allReserv=data.allReservations
   this.gestionreserv.setR(this.allReserv);
   this.reservations=data.allReservations.filter((r:any) => r.voiture.parking==this.idp && r.etat==1)
  //  this.reservations=this.reservations.filter((r:any) => r.voiture.etat="INDISPONIBLE")

   this.loading=false;

   this.updateExpiredReservations();

    // console.log(this.reservations);
  // }),(error:any)=>{
  //   this.loading=false;
  // }

    this.updateCarStateIfMultipleReservations();


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

afficherDetailsVoiture(reservation: any) {
  this.reservSelect = reservation; // Affecter les informations de la reservation sélectionnée à la variable
}

updateCarStateIfMultipleReservations() {
  const reservationsParVoiture = new Map<number, any>(); // Map pour stocker les réservations regroupées par identifiant de voiture

  // Regrouper les réservations par identifiant de voiture
  this.reservations.forEach((reservation: any) => {
    const idVoiture = reservation.voiture.id;
    if (!reservationsParVoiture.has(idVoiture)) {
      reservationsParVoiture.set(idVoiture, []);
    }
    reservationsParVoiture.get(idVoiture)?.push(reservation);
    
    // console.log("re",reservationsParVoiture);
  });

  // Traiter les réservations pour chaque voiture
  reservationsParVoiture.forEach((reservationsVoiture: any[], idVoiture: number) => {
    // Trier les réservations par date de fin pour obtenir la dernière en premier
    reservationsVoiture.sort((a, b) => new Date(b.date_fin_reservation).getTime() - new Date(a.date_fin_reservation).getTime());

    // Obtenir la dernière réservation pour la voiture
    const derniereReservation = reservationsVoiture[0];

    // Vérifier s'il existe une dernière réservation
    if (derniereReservation) {
      const dateActuelle = new Date().getTime();
      const dateFin = new Date(derniereReservation.date_fin_reservation).getTime();

      // Mettre à jour l'état de la voiture en fonction de la dernière réservation
      const nouvelEtat = dateFin > dateActuelle ? 'INDISPONIBLE' : 'DISPONIBLE';


      const voitureAMettreAJour = {
        id: derniereReservation.voiture.id,
        etat: nouvelEtat
      };

      // Mettre à jour l'état de la voiture en utilisant VoituresService
      this.voitureService.changeState(voitureAMettreAJour).subscribe(
        () => {
          //  console.log('État de la voiture mis à jour avec succès en fonction de plusieurs réservations.');
          this.reservations = this.reservations.filter((r: any) => new Date(r.date_fin_reservation).getTime() > new Date().getTime());
          // if (nouvelEtat === 'DISPONIBLE') {
          //   this.updateReservationStateToFalse(derniereReservation);
          // }

        },
        (erreur: any) => {
          console.error('Une erreur est survenue lors de la mise à jour de l\'état de la voiture : ', erreur);
        }
      );
        // Update the state of the reservation to false
        // this.updateReservationStateToFalse(derniereReservation);
    }
  });
}

updateExpiredReservations() {
  const expiredReservations = this.reservations.filter((r: any) => new Date(r.date_fin_reservation).getTime() +6000 < new Date().getTime());
  if (expiredReservations.length > 0) {
    expiredReservations.forEach((reservation: any) => {
      reservation.etat = false; // Mettre à jour l'état de la réservation à 'INDISPONIBLE'
      this.gestionreserv.changeState(reservation).subscribe(
        () => {
          // Succès : mettez à jour localement l'état de la réservation
          reservation.etat = false;
        },
        (error: any) => {
          console.error('Une erreur est survenue lors de la mise à jour de l\'état de la réservation : ', error);
        }
      );
    });
  }
}

// updateReservationStateToFalse(reservation: any) {
//   reservation.etat = false;
//   this.gestionreserv.changeState(reservation).subscribe(
//     () => {
//       console.log('État de la réservation mis à jour avec succès à false.');
//     },
//     (error: any) => {
//       console.error('Une erreur est survenue lors de la mise à jour de l\'état de la réservation : ', error);
//     }
//   );
// }




}
