import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpInterceptorProviders } from './interceptors';
import { ApmModule, ApmService } from '@elastic/apm-rum-angular';

import { ErrorHandler } from '@angular/core';
import { ApmErrorHandler } from '@elastic/apm-rum-angular';

@NgModule({
  declarations: [AppComponent],
  imports: [
    ApmModule,
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: ErrorHandler,
      useClass: ApmErrorHandler,
    },
    ApmService,
    HttpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(service: ApmService) {
    // Agent API is exposed through this apm instance
    const apm = service.init({
      serviceName: 'BANANAUI',
      serverUrl: 'http://localhost:8200',
      environment: 'development',
    });
  }
}
