import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store-state';
import { LoadFavorites, AddFavorites, RemoveFavorites, 
  LoadDetails, LoadForecast, LoadLocations } from './weather.actions';


@Injectable()
export class WeatherStore {
  favorites$ = this.store.select(state => {        
    return state['weather'].favorites})
  details$ = this.store.select(state => {    
    return state['weather'].details})
  forecast$ = this.store.select(state => {      
      return state['weather'].forecast})
  locations$ = this.store.select(state => {    
    return state['weather'].locations})

      
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
}
