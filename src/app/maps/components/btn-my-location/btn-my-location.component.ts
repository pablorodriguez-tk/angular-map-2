import { Component } from '@angular/core';
import { PlacesService } from '../../services';
import { MapsService } from '../../services';

@Component({
  selector: 'app-btn-my-location',
  templateUrl: './btn-my-location.component.html',
  styleUrls: ['./btn-my-location.component.css'],
})
export class BtnMyLocationComponent {
  constructor(
    private mapService: MapsService,
    private placesService: PlacesService
  ) {}

  goToMyLocation() {
    if (!this.placesService.isUserLocationReady) {
      throw Error('No hay ubicacion de usuario');
    }
    if (!this.mapService.isMapReady) {
      throw Error('No hay mapa disponible');
    }
    this.mapService.flyTo(this.placesService.useLocation!);
  }
}
