import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store-state';
import { LoadFavorites, AddFavorites, RemoveFavorites, 
  LoadDetails, LoadForecast, LoadLocations, RemoveAlert, ResetAlerts } from './weather.actions';


@Injectable()
export class WeatherStore {
  favorites$ = this.store.select(state => state['weather'].favorites)
  details$ = this.store.select(state => state['weather'].details)
  forecast$ = this.store.select(state => state['weather'].forecast)
  locations$ = this.store.select(state => state['weather'].locations)
  messages$ = this.store.select(state => state['weather'].message)

      
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

  loadDetails(location) {    
    this.store.dispatch(new LoadDetails(location))
  }

  loadLocations(filter) {    
    this.store.dispatch(new LoadLocations(filter))
  }

  loadForecast(locationId) {    
    this.store.dispatch(new LoadForecast(locationId))
  }

  removeAlert(alert) {    
    this.store.dispatch(new RemoveAlert(alert))
  }

  resetAlerts() {    
    this.store.dispatch(new ResetAlerts())
  }
  
 
}
