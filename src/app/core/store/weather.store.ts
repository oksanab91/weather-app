import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store-state';
import { LoadFavorites, AddFavorites, RemoveFavorites, 
  LoadLocations, RemoveAlert, ResetAlerts, LoadWeather, SetTempUnit } from './weather.actions';


@Injectable()
export class WeatherStore {
  favorites$ = this.store.select(state => state['weather'].favorites)
  details$ = this.store.select(state => state['weather'].details)
  forecast$ = this.store.select(state => state['weather'].forecast)
  locations$ = this.store.select(state => state['weather'].locations)
  messages$ = this.store.select(state => state['weather'].message)
  temperatureUnit$ = this.store.select(state => state['weather'].tempUnit)

      
  constructor(private store: Store<AppState>) {}

  loadFavorites() {
    this.store.dispatch(new LoadFavorites())
  }

  addFavorite(favorite) {
    this.store.dispatch(new AddFavorites(favorite))
  }

  removeFavorite(favoriteId) {
    this.store.dispatch(new RemoveFavorites(favoriteId))
  }

  loadWeather(location) {
    this.store.dispatch(new LoadWeather(location))
  }

  loadLocations(filter) {    
    this.store.dispatch(new LoadLocations(filter))
  }

  removeAlert(alert) {    
    this.store.dispatch(new RemoveAlert(alert))
  }

  resetAlerts() {    
    this.store.dispatch(new ResetAlerts())
  }
  
  setTempUnit(unit: string) {
    this.store.dispatch(new SetTempUnit(unit))
  }
 
}
