import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bots',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'callback/:token/:refreshtoken/:expires',
    loadChildren: () =>
      import('./pages/callback/callback.module').then(
        (m) => m.CallbackPageModule
      ),
  },
  {
    path: 'callback',
    loadChildren: () =>
      import('./pages/callback/callback.module').then(
        (m) => m.CallbackPageModule
      ),
  },
  {
    path: 'bots',
    loadChildren: () =>
      import('./pages/bots/bots.module').then((m) => m.BotsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'maps',
    loadChildren: () =>
      import('./pages/maps/maps.module').then((m) => m.MapsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'tasks',
    loadChildren: () =>
      import('./pages/tasks/tasks.module').then((m) => m.TasksPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'options',
    loadChildren: () =>
      import('./pages/options/options.module').then((m) => m.OptionsPageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'amrinfo/:serialnumber',
    loadChildren: () =>
      import('./pages/amrinfo/amrinfo.module').then((m) => m.AmrinfoPageModule),
  },
  {
    path: 'nodesandedges',
    loadChildren: () =>
      import('./pages/nodesandedges/nodesandedges.module').then(
        (m) => m.NodesandedgesPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
