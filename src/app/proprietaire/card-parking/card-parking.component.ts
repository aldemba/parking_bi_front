import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-card-parking',
  templateUrl: './card-parking.component.html',
  styleUrls: ['./card-parking.component.css']
})
export class CardParkingComponent {

  constructor(private location: Location ,private router:Router) { }

  @Input() parkinglist:any



  navigateWithParams(id:number) {
    // const id = this.parkinglist.id;
    // const urlToDisplay = '/admin/parkings/mesvoitures';
    // this.location.replaceState(urlToDisplay);
    const navigationUrl = '/admin/parkings/'+id+'/voitures';
  
    // this.router.navigateByUrl(navigationUrl, { skipLocationChange: true });
    this.router.navigateByUrl(navigationUrl);
  }
  // navigateWithParams(id:number) {
  
  //   const navigationUrl = '/admin/parkings/';
  
  //   this.router.navigateByUrl(navigationUrl+'#id=' +id);
  // }

  pushToHistory(){
    this.location.go(this.location.path())
  }

}
