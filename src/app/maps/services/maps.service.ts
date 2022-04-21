import { Injectable } from '@angular/core';
import { LngLatLike, Map } from 'mapbox-gl';

@Injectable({
  providedIn: 'root',
})
export class MapsService {
  private map?: Map;

  get isMapReady() {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) {
      throw new Error('Map is not ready');
    }
    this.map?.flyTo({
      zoom: 14,
      center: coords,
    });
  }
}
