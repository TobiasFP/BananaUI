import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NodesandedgesPageRoutingModule } from './nodesandedges-routing.module';

import { NodesandedgesPage } from './nodesandedges.page';
import { NodeModule } from 'src/app/components/node/node.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NodesandedgesPageRoutingModule,
    NodeModule,
  ],
  declarations: [NodesandedgesPage],
})
export class NodesandedgesPageModule {}
