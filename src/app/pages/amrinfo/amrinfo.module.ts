import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmrinfoPageRoutingModule } from './amrinfo-routing.module';

import { AmrinfoPage } from './amrinfo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmrinfoPageRoutingModule
  ],
  declarations: [AmrinfoPage]
})
export class AmrinfoPageModule {}
