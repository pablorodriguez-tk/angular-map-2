import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PlacesService } from '../../services';
import { Map, Popup, Marker } from 'mapbox-gl';
import { MapsService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  constructor(
    private placesService: PlacesService,
    private mapsService: MapsService
  ) {}

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation) {
      throw new Error('No hay placesService.userLocation');
    }
    const map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/light-v10',
      center: this.placesService.userLocation,
      zoom: 14,
    });

    const popup = new Popup().setHTML(`<h6>Aqui estoy</h6>
    <span>Estoy en este lugar del mundo</span>`);

    new Marker({ color: 'red' })
      .setLngLat(this.placesService.userLocation)
      .setPopup(popup)
      .addTo(map);

    this.mapsService.setMap(map);
  }
}
