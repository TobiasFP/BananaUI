import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NodeComponent } from './node.component';
import { MapModule } from '../map/map.module';
import { IconsPickerModule } from '../icons-picker/icons-picker.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MapModule,IconsPickerModule],
  declarations: [NodeComponent],
  exports: [NodeComponent],
})
export class NodeModule {}
