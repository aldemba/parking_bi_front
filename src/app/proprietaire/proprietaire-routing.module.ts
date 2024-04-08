import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesParkingsComponent } from './mes-parkings/mes-parkings.component';
import { DetailsParkingComponent } from './details-parking/details-parking.component';

const routes: Routes = [
  {path:'parkings',component:MesParkingsComponent},
  // {path:'parkings/voitures',component:DetailsParkingComponent}
  {path:'parkings/:id/voitures',component:DetailsParkingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProprietaireRoutingModule { }
