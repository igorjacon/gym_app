import {enableProdMode, importProvidersFrom, NgModule} from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import {FormsModule} from "@angular/forms";
import {GymService} from "./app/gym.service";
import {IonicStorageModule} from "@ionic/storage-angular";

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
    FormsModule,
    GymService,
    importProvidersFrom(IonicStorageModule.forRoot()),
  ],
});
