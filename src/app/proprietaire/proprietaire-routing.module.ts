import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesParkingsComponent } from './mes-parkings/mes-parkings.component';
import { DetailsParkingComponent } from './details-parking/details-parking.component';
import { AddCarComponent } from './add-car/add-car.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { MesReservationsComponent } from './mes-reservations/mes-reservations.component';


const routes: Routes = [
  {path:'parkings/:id/voitures/edit/:idv',component:EditCarComponent},
  {path:'parkings/:id/voitures/add/:idv',component:ReservationsComponent},
  {path:'parkings/:id/voitures/add',component:AddCarComponent},
  {path:'parkings/:id/voitures',component:DetailsParkingComponent},
  {path:'parkings/:id/reservations',component:MesReservationsComponent},
  {path:'parkings',component:MesParkingsComponent},
  // {path:'parkings/voitures',component:DetailsParkingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProprietaireRoutingModule { }
