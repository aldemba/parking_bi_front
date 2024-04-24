import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Voiture } from 'src/app/shared/models/voiture';
import { VoituresService } from 'src/app/shared/services/voitures.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent {
  parkingId: number=0
  idv:number=0
  visible:boolean=false;
  voiture:Voiture|undefined


  constructor(private route:ActivatedRoute,private voitureServ : VoituresService) { }

  ngOnInit(){
    let carId=0;
    this.route.paramMap.subscribe(param=>{
      carId=+param.get("idv")!;
      this.idv=carId
    })
    let id=0;
    this.route.paramMap.subscribe(param=>{
      id=+param.get("id")!;
      this.parkingId=id;
      // console.log(this.parkingId);

      if (carId) {
        this.voitureServ.getVoitureById(+carId).subscribe(data=>{
          this.voiture=data;
          console.log(this.voiture);
          
        })
      }
      
    })


  }

  showModal(){
    this.visible=!this.visible
  }

}
