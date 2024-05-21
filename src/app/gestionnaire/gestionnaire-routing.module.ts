import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesusersComponent } from './mesusers/mesusers.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ParkingUserComponent } from './parking-user/parking-user.component';
import { AddParkingComponent } from './add-parking/add-parking.component';
import { EditParkingComponent } from './edit-parking/edit-parking.component';
import { UpdatePasswordComponent } from './update-password/update-password.component';

const routes: Routes = [
  
  {path:'users/:id/parking/edit/:idp',component:EditParkingComponent},
  {path:'users/update-password/:id',component:UpdatePasswordComponent},
  {path:'users/:id/details-user',component:ParkingUserComponent},
  {path:'users/:id/add/parkings',component:AddParkingComponent},
  {path:'users/edit/:id',component:EditUserComponent},
  {path:'users/add',component:AddUserComponent},
  {path:'accueil',component:AccueilComponent},
  {path:'users',component:MesusersComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionnaireRoutingModule { }
