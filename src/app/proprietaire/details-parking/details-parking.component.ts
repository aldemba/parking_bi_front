import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from 'src/app/shared/services/details.service';
import { VoituresService } from 'src/app/shared/services/voitures.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-parking',
  templateUrl: './details-parking.component.html',
  styleUrls: ['./details-parking.component.css']
})
export class DetailsParkingComponent {

  voitures:any

  totalLength:any;
  page:number=1; 
  searchTerm: any;

  constructor(private activatedroute:ActivatedRoute, private detailserv:DetailsService, private voitureserv: VoituresService) { }

  ngOnInit() {
    let id=0;
    this.activatedroute.paramMap.subscribe(
      param=> {
        id=+param.get("id")!;
    
        this.detailserv.getVoituresByParking(id).subscribe((data)=> {
          this.voitures=data.voitures;
          this.totalLength=this.voitures.length;
          // console.log("test",this.voitures);
          
        })
      }
    )

  }
  

  // updateEtat(voiture: any) {

  //   this.voitureserv.changeState(voiture).subscribe({
  //     // next: (data:any) => { alert(data)},
  //     // error: (err:any) => { alert(err)}
  //   });
  // }

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
    
  }




