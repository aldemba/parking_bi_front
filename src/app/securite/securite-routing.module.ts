import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConnexionComponent } from './connexion/connexion.component';
import { loginGuard } from '../shared/guards/login.guard';

const routes: Routes = [
  {path:"login",component:ConnexionComponent ,canActivate: [loginGuard]},
  {path:'', redirectTo:'login',pathMatch:'full'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecuriteRoutingModule { }
