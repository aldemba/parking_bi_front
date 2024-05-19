import { Component } from '@angular/core';
import { CatalogueService } from 'src/app/shared/services/catalogue.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {

  voitures:number=0;
  parkings:number=0;
  proprietaires:number=0;
  loading: boolean = true; 


  constructor(private catalogue: CatalogueService) { }


  ngOnInit() {
    this.catalogue.getCatalogue().subscribe(cata=>{
      // console.log(cata);
      this.voitures = cata.voitures.length;
      this.parkings = cata.parkings.length;
      this.proprietaires= cata.proprietaires.length;
      this.loading = false;
      
      
      
    },(error:any)=>{
      this.loading = false;
    }

    )
  }
}
