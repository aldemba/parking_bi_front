import { Component } from '@angular/core';
import { CatalogueService } from 'src/app/shared/services/catalogue.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {

  parkings:any

  constructor(private catalogue:CatalogueService){

  }

  ngOnInit(){
    this.catalogue.getCatalogue().subscribe((data)=>{
      this.parkings=data

      console.log(data);
      
    })
  }

}
