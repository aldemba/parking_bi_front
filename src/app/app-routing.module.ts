import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:'security', loadChildren: ()=> import('./securite/securite.module').then(m=>m.SecuriteModule)},
  {path:'client', loadChildren: ()=> import('./client/client.module').then(m=>m.ClientModule)},
  // {path:'superadmin', loadChildren: ()=> import('./gestionnaire/gestionnaire.module').then(m=>m.GestionnaireModule)},
  {path:'admin', loadChildren: ()=> import('./proprietaire/proprietaire.module').then(m=>m.ProprietaireModule)},
  {path:'', redirectTo:'security',pathMatch:'full'},
  {path:'**',component:NotFoundComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
