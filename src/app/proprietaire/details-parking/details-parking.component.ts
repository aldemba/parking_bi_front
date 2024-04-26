import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsService } from 'src/app/shared/services/details.service';
import { VoituresService } from 'src/app/shared/services/voitures.service';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';
import { Voiture } from 'src/app/shared/models/voiture';

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
  

  // objets:Voiture[] = [];

  constructor(private activatedroute:ActivatedRoute, private detailserv:DetailsService, private voitureserv: VoituresService, private router:Router, private toastr: ToastrService) { }

  ngOnInit() {
    let id=0;
    this.activatedroute.paramMap.subscribe(
      param=> {
        id=+param.get("id")!;
        this.idbis=id;
    
        this.detailserv.getVoituresByParking(id).subscribe((data)=> {
          this.voitures=data.voitures;
          this.voitures = this.voitures.filter((voiture: any) => voiture.isVisible ==1);
          this.filtres = this.voitures.filter((voiture: any) => voiture.isVisible ==1);
          this.totalLength=this.voitures.length;
          // this.objets.push(data.voitures)
           console.log("test",this.voitures);
          // console.log("id",this.idbis);
          
          // this.voitures.forEach((voiture: any) => {
          //   voiture.etatSwitch = voiture.etat === 'DISPONIBLE';
          // });
        })
      }
    )
    this.voitureserv.getVoituresByEtat(id).subscribe((data)=> {
      this.disponibles=data.disponibles;
      this.indisponibles=data.indisponibles;
    
      this.all=data.all;
    })

    // this.objets = this.verifierDifference(this.objets);
    // console.log("a", this.objets);

  }
  
  searchItemsPerPage() {
    return this.searchTerm ? 50 : 8;
}

afficherDetailsVoiture(voiture: any) {
  this.voitureSelectionnee = voiture; // Affecter les informations de la voiture sélectionnée à la variable
}

showSuccess() {
  this.toastr.success('La voiture a été supprimé avec succès!', 'Suppression!');
}


getDifferenceInDays(dateString: string): boolean {
  const today = new Date();
  const expirationDate = new Date(dateString);
  const differenceInMs = expirationDate.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
  return differenceInDays <= 7;
}


// // Fonction pour calculer la différence entre deux dates en jours
//  differenceEnJours(date1:any, date2:any) {
//   const unJour = 24 * 60 * 60 * 1000; // Nombre de millisecondes dans un jour
//   const diffTemps = Math.abs(date1.getTime() - date2.getTime());;
//   return Math.round(diffTemps / unJour);
// }


// Fonction principale pour vérifier la différence et ajouter ou supprimer un attribut
// verifierDifference(objets: any) {
//   let dateDuJour = new Date(); // Date actuelle

//   console.log("table",objets);
  

//    objets[0].forEach((objet: any) => {
//     let dateFinVisite = objet.visite.date_fin_visite;
//     let dateFinAssurance = objet.assurance.date_fin;

//     console.log(dateFinVisite);
//     console.log(dateFinAssurance);
    
    

//   //   // Calcul de la différence en jours
//   //   // const differenceVisite: number = Math.ceil((dateFinVisite.getTime() - dateDuJour.getTime()) / (1000 * 3600 * 24));
//   //   // const differenceAssurance: number = Math.ceil((dateFinAssurance.getTime() - dateDuJour.getTime()) / (1000 * 3600 * 24));

//   //   // // Vérification de la différence et ajout ou suppression de l'attribut
//   //   // if (differenceVisite < 7 || differenceAssurance < 7) {
//   //   //   objet = Object.assign({}, objet, {
//   //   //     "differenceInf7Jours": true
//   //   //   });
//   //   // } else {
//   //   //   delete objet.differenceInf7Jours;
//   //   // }
//    });

//   return objets; // Retourne les objets modifiés
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
  this.router.navigate(["/admin/parkings/"+this.idbis+"/voitures/add"]);
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


    
  }




