import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import Mapboxgl from 'mapbox-gl';

if (!navigator.geolocation) {
  alert('Navegador no soporta la Geolocation');
  throw new Error('Navegador no soporta la Geolocation');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

Mapboxgl.accessToken =
  'pk.eyJ1IjoidGVra2EtYXJnIiwiYSI6ImNsMjg3cGFlbzA2bDMzY3BhNms3NXJybXEifQ.YZHhMVFfm92J7jwrwPSS5Q';
