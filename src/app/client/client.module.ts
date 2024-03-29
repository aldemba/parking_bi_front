import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { NavComponent } from './nav/nav.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { LayoutModule } from '../layout/layout.module';
import { CardComponent } from './card/card.component';
import { ScaleCardDirective } from './scale-card.directive';


@NgModule({
  declarations: [
    NavComponent,
    CatalogueComponent,
    CardComponent,
    ScaleCardDirective
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    LayoutModule
  ]
})
export class ClientModule { }
