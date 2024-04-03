import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesParkingsComponent } from './mes-parkings/mes-parkings.component';

const routes: Routes = [
  {path:'parkings',component:MesParkingsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProprietaireRoutingModule { }
