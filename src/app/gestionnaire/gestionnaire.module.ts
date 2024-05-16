import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionnaireRoutingModule } from './gestionnaire-routing.module';
import { LayoutModule } from '../layout/layout.module';
import {ReactiveFormsModule } from '@angular/forms';
import { EditParkingComponent } from './edit-parking/edit-parking.component';
import { AddParkingComponent } from './add-parking/add-parking.component';
import { ParkingUserComponent } from './parking-user/parking-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MesusersComponent } from './mesusers/mesusers.component';




@NgModule({
  declarations: [
    MesusersComponent,
    AccueilComponent,
    AddUserComponent,
    EditUserComponent,
    ParkingUserComponent,
    AddParkingComponent,
    EditParkingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GestionnaireRoutingModule,
    LayoutModule,
    
  ]
})
export class GestionnaireModule { }
