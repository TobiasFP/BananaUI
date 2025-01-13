import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderComponent } from './order.component';
import { MapModule } from '../map/map.module';
import { IconsPickerModule } from '../icons-picker/icons-picker.module';
import { NodeModule } from '../node/node.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapModule,
    IconsPickerModule,
    NodeModule,
  ],
  declarations: [OrderComponent],
  exports: [OrderComponent],
})
export class OrderModule {}
