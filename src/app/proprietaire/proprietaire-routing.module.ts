import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesParkingsComponent } from './mes-parkings/mes-parkings.component';
import { DetailsParkingComponent } from './details-parking/details-parking.component';
import { AddCarComponent } from './add-car/add-car.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { MesReservationsComponent } from './mes-reservations/mes-reservations.component';
import { EditReservationComponent } from './edit-reservation/edit-reservation.component';
import { roleGuard } from '../shared/guards/role.guard';


const routes: Routes = [
  {path:'parkings/:id/voitures/edit/:idv',component:EditCarComponent},
  {path:'parkings/:id/voitures/add/:idv',component:ReservationsComponent},
  {path:'parkings/reservations/edit/:idr',component:EditReservationComponent},
  {path:'parkings/:id/voitures/add',component:AddCarComponent},
  {path:'parkings/:id/voitures',component:DetailsParkingComponent},
  {path:'parkings/reservations',component:MesReservationsComponent},
  {path:'parkings',component:MesParkingsComponent},
  // {path:'parkings',component:MesParkingsComponent, canActivate:[roleGuard], data: { role: "ROLE_PROPRIETAIRE"}}
  // {path:'parkings/voitures',component:DetailsParkingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProprietaireRoutingModule { }
