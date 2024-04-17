import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailsService } from 'src/app/shared/services/details.service';
import { VoituresService } from 'src/app/shared/services/voitures.service';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';

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
          // console.log("test",this.voitures);
          
        })
      }
    )
    this.voitureserv.getVoituresByEtat(id).subscribe((data)=> {
      this.disponibles=data.disponibles;
      this.indisponibles=data.indisponibles;
    
      this.all=data.all;
    })

  }
  
  searchItemsPerPage() {
    return this.searchTerm ? 50 : 8;
}

afficherDetailsVoiture(voiture: any) {
  this.voitureSelectionnee = voiture; // Affecter les informations de la voiture sélectionnée à la variable
}

showSuccess() {
  this.toastr.success('Hello world!', 'Toastr fun!');
}


  updateEtat(voiture: any) {
    // Afficher la boîte modale SweetAlert pour demander la confirmation
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "Voulez-vous vraiment changer l'état de cette voiture?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, changer l\'état!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si l'utilisateur confirme, changer l'état de la voiture
        this.voitureserv.changeState(voiture).subscribe({
          // Vous pouvez gérer les réponses de votre requête ici
          // next: (data:any) => { alert(data)},
          // error: (err:any) => { alert(err)}
        });
      }
    });
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




