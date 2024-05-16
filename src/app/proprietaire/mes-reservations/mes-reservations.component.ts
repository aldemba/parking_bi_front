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

reservSelect: any;


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
  this.reservations = this.reservations.filter((r: any) => new Date(r.date_fin_reservation).getTime() > new Date().getTime());

   this.loading=false;

    console.log(this.reservations);
  // }),(error:any)=>{
  //   this.loading=false;
  // }

  // this.reservations.forEach((reservation: any) => {
  //     this.updateCarStateIfExpired(reservation);
  //     // this.reservations = this.reservations.filter((r: any) => new Date(r.date_fin_reservation).getTime() > new Date().getTime());
  // });

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
          console.log('État de la voiture mis à jour avec succès en fonction de plusieurs réservations.');
        },
        (erreur: any) => {
          console.error('Une erreur est survenue lors de la mise à jour de l\'état de la voiture : ', erreur);
        }
      );
    }
  });
}


// updateCarStateIfExpired(reservation: any) {
//   const currentDate = new Date().getTime();
//   const endDate = new Date(reservation.date_fin_reservation).getTime();

  
  
//   // console.log('Current Date:', currentDate);
//   // console.log('End Date:', endDate);
//   // console.log(typeof endDate)

//   if (endDate <= currentDate) {
//     // Mettez à jour l'état de la voiture.
//     const voitureToUpdate = {
//       id: reservation.voiture.id, // Assurez-vous que cet objet contient un identifiant unique.
//       etat: 'DISPONIBLE' // Vous pouvez ajuster cette valeur selon vos besoins.
//     };

//     // Appelez la méthode changeState de VoituresService pour mettre à jour l'état de la voiture.
//     this.voitureService.changeState(voitureToUpdate).subscribe(
//       () => {
//         console.log('État de la voiture mis à jour avec succès.');
//       },
//       (error:any) => {
//         console.error('Une erreur est survenue lors de la mise à jour de l\'état de la voiture : ', error);
//       }
//     );
//   }
// }

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
