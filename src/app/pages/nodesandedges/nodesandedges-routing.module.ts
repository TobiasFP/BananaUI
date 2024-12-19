import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NodesandedgesPage } from './nodesandedges.page';

const routes: Routes = [
  {
    path: '',
    component: NodesandedgesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NodesandedgesPageRoutingModule {}
