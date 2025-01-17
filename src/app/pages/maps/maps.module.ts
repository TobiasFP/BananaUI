import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapsPageRoutingModule } from './maps-routing.module';

import { MapsPage } from './maps.page';
import { MapModule } from 'src/app/components/map/map.module';
import { MapUploadComponentModule } from '../../components/map-upload-component/map-upload-component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapsPageRoutingModule,
    MapModule,
    MapUploadComponentModule
  ],
  declarations: [MapsPage],
})
export class MapsPageModule {}
