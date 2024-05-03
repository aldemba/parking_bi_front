import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DetailsService } from 'src/app/shared/services/details.service';
import { VoituresService } from 'src/app/shared/services/voitures.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


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
  expectedUrl=''
  

  // objets:Voiture[] = [];

  constructor(private activatedroute:ActivatedRoute,private location: Location, private detailserv:DetailsService, private voitureserv: VoituresService, private router:Router, private toastr: ToastrService) { }

  ngOnInit() {
    let id=0;
    this.activatedroute.paramMap.subscribe(
      param=> {
        id=+param.get("id")!;
        this.idbis=id;
        // console.log(id);
        
    
        this.detailserv.getVoituresByParking(id).subscribe((data)=> {
          // console.log(data["parking"].voitures);
          
          this.voitures=data["parking"].voitures;
          this.voitures = this.voitures.filter((voiture: any) => voiture.isVisible ==1);
          this.filtres = this.voitures.filter((voiture: any) => voiture.isVisible ==1);
          this.totalLength=this.voitures.length;
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
          
          // this.voitures.forEach((voiture: any) => {
          //   voiture.etatSwitch = voiture.etat === 'DISPONIBLE';
          // });
        }, (error:any)=>{
          console.log(error);
          
          // if (error.status=="403") {
          //   this.toastr.error("Vous n'êtes pas autorisé à accéder aux voitures de ce parking.");
          //   alert("non")
          // }
          // else{
          //   this.toastr.error("Une erreur s'est produite lors de la récupération des voitures.");

          // } 
        })
      }
    )
    this.voitureserv.getVoituresByEtat(id).subscribe((data)=> {
      this.disponibles=data.disponibles;
      this.indisponibles=data.indisponibles;
    
      this.all=data.all;
    })

    //  this.expectedUrl="/admin/parkings/"+this.idbis+"/voitures"

    //  window.onpopstate = () => {
    //   // const newId=this.activatedroute.snapshot.params["id"];
    //   const newId = +localStorage.getItem("idvt")!;
    //   if(newId && newId !== id){
    //     this.router.navigateByUrl('/admin/parkings/'+newId+'/voitures')
    //   }
    // }

    // this.router.events.subscribe((event)=> {
    //   if (event instanceof NavigationEnd) {
    //     // const newId=this.activatedroute.snapshot.params["id"];
    //     const newId = +localStorage.getItem("idvt")!;
    //     if(newId && newId !== id){
    //       this.router.navigateByUrl('/admin/parkings/'+id+'/voitures')
    //     }
    //   }
    // })

//     this.router.events.subscribe((event) => {
//   if (event instanceof NavigationEnd) {
//     const newId = +localStorage.getItem("idvt")!;
//     const currentId = +this.activatedroute.snapshot.paramMap.get("id")!;

//     if (newId && newId !== currentId) {
//       // Utilisation de newId pour construire la nouvelle URL
//       this.router.navigateByUrl('/admin/parkings/' + newId + '/voitures');
//     }
//   }
// });


    // console.log("a",this.router.url);
    
    // this.saveStorage(this.idbis)
 
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

// saveStorage(id:number){
//   return localStorage.setItem("idvt",id.toString());
// }


// ngOnDestroy(){
//   localStorage.removeItem("idvt");
// }


// // Fonction pour calculer la différence entre deux dates en jours
getDifferenceInDays(dateString: string): boolean {
  const today = new Date();
  const expirationDate = new Date(dateString);
  const differenceInMs = expirationDate.getTime() - today.getTime();
  const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
  return differenceInDays <= 7;
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


    
  }




