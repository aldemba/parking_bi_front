import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecuriteRoutingModule } from './securite-routing.module';
import { ConnexionComponent } from './connexion/connexion.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ConnexionComponent,
    InscriptionComponent
  ],
  imports: [
    CommonModule,
    SecuriteRoutingModule,
    FormsModule
  ]
})
export class SecuriteModule { }
