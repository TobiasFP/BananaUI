import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { MapModule } from '../map/map.module';
import { IconsPickerModule } from '../icons-picker/icons-picker.module';
import { MapUploadComponentComponent } from './map-upload-component.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MapModule,IconsPickerModule],
  declarations: [MapUploadComponentComponent],
  exports: [MapUploadComponentComponent],
})
export class MapUploadComponentModule{}
