import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmrinfoPage } from './amrinfo.page';

const routes: Routes = [
  {
    path: '',
    component: AmrinfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmrinfoPageRoutingModule {}
