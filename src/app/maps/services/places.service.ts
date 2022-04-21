import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlacesResponse, Feature } from '../interfaces/places';
import { PlacesApiClient } from '../api';
import { MapsService } from './maps.service';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public useLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean {
    return !!this.useLocation;
  }

  constructor(
    private placesApi: PlacesApiClient,
    private mapsService: MapsService
  ) {
    this.getUserLocation();
  }

  public getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.useLocation = [coords.longitude, coords.latitude];
          resolve([coords.longitude, coords.latitude]);
        },
        (error) => {
          alert('No se pudo obtener la geolocalizacion');
          console.log(error);
          reject();
        }
      );
    });
  }
  getPlacesByQuery(query: string = '') {
    if (query.length === 0) {
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }
    if (!this.useLocation) throw new Error('No hay useLocation');

    this.isLoadingPlaces = true;
    this.placesApi
      .get<PlacesResponse>(`/${query}.json`, {
        params: { proximity: this.useLocation?.join(',') },
      })
      .subscribe((data) => {
        this.isLoadingPlaces = false;
        this.places = data.features;
        this.mapsService.createMarkersFromPlaces(this.places);
      });
  }
}
