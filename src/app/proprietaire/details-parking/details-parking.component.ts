import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from 'src/app/shared/services/details.service';
import { VoituresService } from 'src/app/shared/services/voitures.service';

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
  

  updateEtat(voiture: any) {

    this.voitureserv.changeState(voiture).subscribe({
      // next: (data:any) => { alert(data)},
      // error: (err:any) => { alert(err)}
    });
  }
    
  }

  // ngOnInit(): void {
  //   let slug:string=this.activatedroute.snapshot.params['slug']
  //   this.detailserv.getVoituresByParking(slug).subscribe(
  //     (data)=>{
  //       this.voitures=data

  //       console.log(this.voitures);
        
      
        
  //     }
  //   )
  //     }


