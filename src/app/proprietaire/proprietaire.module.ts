import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProprietaireRoutingModule } from './proprietaire-routing.module';
import { MesParkingsComponent } from './mes-parkings/mes-parkings.component';
import { LayoutModule } from '../layout/layout.module';
import { CardParkingComponent } from './card-parking/card-parking.component';
import { DetailsParkingComponent } from './details-parking/details-parking.component';
import { ScalecardadminDirective } from './scalecardadmin.directive';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from './filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCarComponent } from './add-car/add-car.component';
import { EditCarComponent } from './edit-car/edit-car.component';




@NgModule({
  declarations: [
    MesParkingsComponent,
    CardParkingComponent,
    DetailsParkingComponent,
    ScalecardadminDirective,
    FilterPipe,
    AddCarComponent,
    EditCarComponent,
  ],
  imports: [
    CommonModule,
    ProprietaireRoutingModule,
    LayoutModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProprietaireModule { }
