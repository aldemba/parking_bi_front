import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProprietaireRoutingModule } from './proprietaire-routing.module';
import { MesParkingsComponent } from './mes-parkings/mes-parkings.component';


@NgModule({
  declarations: [
    MesParkingsComponent
  ],
  imports: [
    CommonModule,
    ProprietaireRoutingModule
  ]
})
export class ProprietaireModule { }
