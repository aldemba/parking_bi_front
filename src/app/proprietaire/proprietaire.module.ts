import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProprietaireRoutingModule } from './proprietaire-routing.module';
import { MesParkingsComponent } from './mes-parkings/mes-parkings.component';
import { LayoutModule } from '../layout/layout.module';
import { CardParkingComponent } from './card-parking/card-parking.component';



@NgModule({
  declarations: [
    MesParkingsComponent,
    CardParkingComponent
  ],
  imports: [
    CommonModule,
    ProprietaireRoutingModule,
    LayoutModule
  ]
})
export class ProprietaireModule { }
