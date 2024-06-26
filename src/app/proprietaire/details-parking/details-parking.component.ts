import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DetailsService } from 'src/app/shared/services/details.service';
import { VoituresService } from 'src/app/shared/services/voitures.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


import Swal from 'sweetalert2';
import { Voiture } from 'src/app/shared/models/voiture';
import { ErrorService } from 'src/app/shared/services/error.service';
import { DisponibiliteService } from 'src/app/shared/services/disponibilite.service';
import { GestionReservationService } from 'src/app/shared/services/gestion-reservation.service';


@Component({
  selector: 'app-details-parking',
  templateUrl: './details-parking.component.html',
  styleUrls: ['./details-parking.component.css']
})
export class DetailsParkingComponent {

  voitures:any
  voitureSelectionnee: any;
  disponibles:any;
  filtres:any;
  indisponibles:any;
  all:any;
  totalLength:any;
  page:number=1; 
  searchTerm: any;
  idbis:number=0;
  etatSwitch: boolean = false;
  test:boolean=true
  expectedUrl=''
  errorMessage: string | null = null;
  loading: boolean = true; 
  reservations:any;

  



  constructor(private activatedroute:ActivatedRoute,private location: Location, private detailserv:DetailsService, private voitureserv: VoituresService, private router:Router, private toastr: ToastrService,private errorService: ErrorService, private gestionserv:GestionReservationService, private disponibiliteService:DisponibiliteService, private voitureService: VoituresService, private gestionreserv:GestionReservationService ) { }

  ngOnInit() {
    let id=0;
    this.activatedroute.paramMap.subscribe(
      param=> {
        id=+param.get("id")!;
        this.idbis=id;
        // this.gestion.setId(this.idbis);
        // console.log(id);
        
    
        this.detailserv.getVoituresByParking(id).subscribe((data)=> {
          // console.log(data["parking"].voitures);
          
          this.voitures=data["parking"].voitures;
          this.voitures = this.voitures.filter((voiture: any) => voiture.isVisible ==1);
          this.filtres = this.voitures.filter((voiture: any) => voiture.isVisible ==1);
          this.totalLength=this.voitures.length;
          this.loading=false;
          // console.log("donnees",data);
          
          // this.objets.push(data.voitures)
          //  console.log("test",this.voitures);
          // console.log("id",this.idbis);

          this.voitures.forEach((voiture: any) => {
            if (this.getDifferenceInDaysbis(voiture.assurance.date_fin) || this.getDifferenceInDaysbis(voiture.visite.date_fin_visite)) {
              // Update state to unavailable
              voiture.etat = 'INDISPONIBLE';
              // Call service method to update state in database
              this.voitureserv.changeState(voiture).subscribe();
            }
          });
          this.gestionserv.idObservable$.subscribe(reserv=>{
            this.reservations=reserv.filter((r:any) => r.voiture.parking==id && r.etat==1);
            // this.reservations=this.reservations
          })

         this.updateExpiredReservations();

        this.updateCarStateIfMultipleReservations();


          // console.log(this.reservations);
          
          
          // this.voitures.forEach((voiture: any) => {
          //   voiture.etatSwitch = voiture.etat === 'DISPONIBLE';
          // });
        }, (error:any)=>{
          this.loading=false;
          // console.log(error);
          //  this.toastr.error("Vous n'êtes pas autorisé à accéder aux voitures de ce parking.","error");
          // alert("Attention, quelque chose s'est mal passée !")
          // console.log(error);
          
          // if (error.status===403) {
          //   console.log("Vous n'êtes pas autorisé à accéder aux voitures de ce parking.");
          // }
          // else{
          //   // this.toastr.error("Une erreur s'est produite lors de la récupération des voitures.");

          // } 
        })
      }
    )
    this.voitureserv.getVoituresByEtat(id).subscribe((data)=> {
      this.disponibles=data.disponibles;
      this.indisponibles=data.indisponibles;
    
      this.all=data.all;
    })

    this.errorService.errorMessage$.subscribe(message=>{
      this.errorMessage=message;
    })
 
  }

  taille(){
    if (this.voitures && this.voitures.length >0) {
      return true
    }
    return false
  }

  testEtat(etat:string){
    if(etat =="DISPONIBLE"){
      return true
    }
      return false
  }

  getDifferenceInDaysbis(dateString: string): boolean {
    const today = new Date();
    const date = new Date(dateString);
    const differenceInMs = date.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
    return differenceInDays <= 0;
  }

  
searchItemsPerPage() {
    return this.searchTerm ? 50 : 8;
}

afficherDetailsVoiture(voiture: any) {
  this.voitureSelectionnee = voiture; // Affecter les informations de la voiture sélectionnée à la variable
}

showSuccess() {
  this.toastr.success('La voiture a été supprimée avec succès!', 'Suppression!');
}

mettreAJourDisponibiliteVoiture(disponibilite: string) {
  this.disponibiliteService.mettreAJourDisponibilite(disponibilite);
}




// // Fonction pour calculer la différence entre deux dates en jours
getDifferenceInDays(dateString: string): boolean {
  const today = new Date();
  const expirationDate = new Date(dateString);
  const differenceInMs = expirationDate.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
  return differenceInDays <= 7;
}


  

 changeVisibility(voiture: any) {
  Swal.fire({
    title: 'Êtes-vous sûr?',
    text: "Voulez-vous vraiment supprimer cette voiture?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Oui, supprimer cette voiture !',
    cancelButtonText: 'Annuler'
  }).then((result) => {
    if (result.isConfirmed) {
      // Si l'utilisateur confirme, changer l'état de la voiture
      this.voitureserv.changeVisibility(voiture).subscribe({
        // Vous pouvez gérer les réponses de votre requête ici
        // next: (data:any) => { alert(data)},
        // error: (err:any) => { alert(err)}
      });
      // this.router.navigate(["/admin/parkings/"+this.idbis+"/voitures"]);

      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(["/admin/parkings/"+this.idbis+"/voitures"]);
        this.showSuccess()
    }); 

    }
  });
 }

 redirectToAdd(){
  const navigation="/admin/parkings/"+this.idbis+"/voitures/add"
  //  const urlToDisplay = '/admin/parkings/add';
  //   this.location.replaceState(urlToDisplay);
  // this.router.navigate(["/admin/parkings/"+this.idbis+"/voitures/add"]);
  // this.router.navigateByUrl(navigation,{skipLocationChange:true})
  this.router.navigateByUrl(navigation)
 }

 pushToHistory(){
  this.location.go(this.location.path())
}




 redirectToEdit(idv:number){
  this.router.navigate(["/admin/parkings/"+this.idbis+"/voitures/edit/"+idv]);
 }

 redirectToReservation(idv:number){
  this.router.navigate(["/admin/parkings/"+this.idbis+"/voitures/add/"+idv]);
 }


  clickchanged(type:string){
    switch (type) {
      case "disponibles":
    this.voitures=this.filtres.filter((voiture: any) => voiture.etat =="DISPONIBLE")
        
        break;
        case "indisponibles":
        this.voitures=this.filtres.filter((voiture: any) => voiture.etat =="INDISPONIBLE")
      
          break;
    
      default:
        this.voitures=this.filtres

        break;
    }
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


    
  }






  // updateEtat(voiture: any) {
  //   // Afficher la boîte modale SweetAlert pour demander la confirmation
  //   Swal.fire({
  //     title: 'Êtes-vous sûr?',
  //     text: "Voulez-vous vraiment changer l'état de cette voiture?",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Oui, changer l\'état!',
  //     cancelButtonText: 'Annuler'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Si l'utilisateur confirme, changer l'état de la voiture
  //       this.voitureserv.changeState(voiture).subscribe({
  //         // Vous pouvez gérer les réponses de votre requête ici
  //         // next: (data:any) => { alert(data)},
  //         // error: (err:any) => { alert(err)}
  //       });
  //     }
  //   });
  // }

  // updateEtat(voiture: any) {
  //   // Afficher la boîte modale SweetAlert pour demander la confirmation
  //   Swal.fire({
  //     title: 'Êtes-vous sûr?',
  //     text: "Voulez-vous vraiment changer l'état de cette voiture?",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Oui, changer l\'état!',
  //     cancelButtonText: 'Annuler'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // Inverser l'état de la voiture
  //       const nouvelEtat = voiture.etat === 'DISPONIBLE' ? 'INDISPONIBLE' : 'DISPONIBLE';
  //       voiture.etat = nouvelEtat; // Met à jour l'état
  //       this.voitureserv.changeState(voiture).subscribe({
  //         // Vous pouvez gérer les réponses de votre requête ici
  //         // next: (data:any) => { alert(data)},
  //         // error: (err:any) => { alert(err)}
  //       });
  //     }
  //   });
  // }
  
  
  
  

  // updateEtat(voiture: any) {

  //   this.voitureserv.changeState(voiture).subscribe({
  //     // next: (data:any) => { alert(data)},
  //     // error: (err:any) => { alert(err)}
  //   });
  // }

  // }



   