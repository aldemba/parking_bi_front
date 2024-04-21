import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { VoituresService } from 'src/app/shared/services/voitures.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent {

  constructor(
    private formulaire :FormBuilder,
    private voitureServ : VoituresService
  )
  {

  }




}
