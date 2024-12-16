import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { IconsPickerComponent } from './icons-picker.component';



@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [IconsPickerComponent],
  exports: [IconsPickerComponent],
})
export class IconsPickerModule {}
