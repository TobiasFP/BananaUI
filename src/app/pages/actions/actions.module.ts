import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActionsPageRoutingModule } from './actions-routing.module';

import { ActionsPage } from './actions.page';
import { ActionParameterComponent } from 'src/app/components/actions/action-parameter/action-parameter.component';
import { PrebuiltActionsComponent } from 'src/app/components/actions/list/prebuilt-actions/prebuilt-actions.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActionsPageRoutingModule,
    ActionParameterComponent,
    PrebuiltActionsComponent
  ],
  declarations: [ActionsPage]
})
export class ActionsPageModule {}
