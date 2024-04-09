import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailsService } from 'src/app/shared/services/details.service';

@Component({
  selector: 'app-details-parking',
  templateUrl: './details-parking.component.html',
  styleUrls: ['./details-parking.component.css']
})
export class DetailsParkingComponent {

  voitures:any

  constructor(private activatedroute:ActivatedRoute, private detailserv:DetailsService) { }

  ngOnInit() {
    let id=0;
    this.activatedroute.paramMap.subscribe(
      param=> {
        id=+param.get("id")!;
    
        this.detailserv.getVoituresByParking(id).subscribe((data)=> {
          this.voitures=data;
          // console.log(this.voitures);
          
        })
      }
    )

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

}
