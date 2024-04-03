import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-parking',
  templateUrl: './card-parking.component.html',
  styleUrls: ['./card-parking.component.css']
})
export class CardParkingComponent {

  @Input() parkinglist:any


}
