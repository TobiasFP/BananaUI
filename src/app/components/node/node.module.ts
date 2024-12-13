import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NodeComponent } from './node.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [NodeComponent],
  exports: [NodeComponent],
})
export class NodeModule {}
