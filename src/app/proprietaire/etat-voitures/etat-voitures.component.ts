import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoituresService } from 'src/app/shared/services/voitures.service';

@Component({
  selector: 'app-etat-voitures',
  templateUrl: './etat-voitures.component.html',
  styleUrls: ['./etat-voitures.component.css']
})
export class EtatVoituresComponent {

  voitures:any

  constructor(private carserv: VoituresService,private activatedroute:ActivatedRoute) { }

  ngOnInit(){
    let id=0;
    this.activatedroute.paramMap.subscribe(
      param=> {
        id=+param.get("id")!;
          this.carserv.getVoituresByEtat(id).subscribe((data)=> {
            this.voitures=data;
            console.log(this.voitures);
            
          })
          
        })
      }
    

}
