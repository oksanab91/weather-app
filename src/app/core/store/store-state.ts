import {LocationWeather, Favorite, LocationShort, WeatherForecast} from '@models/models';


  export class AppState {
    favorites: Favorite[]
    details: LocationWeather = new LocationWeather()
    locations: LocationShort[]
    currentLocation: LocationShort
    forecast: WeatherForecast[]
    message: string    
  }

  // export const favoritesLocationsSelect = (state: AppState) => state.favoritesLocations  
  // export const favorites$ = (state: AppState) => state.favorites  
  // export const details$ = (state: AppState) => state.details
  // export const forecast$ = (state: AppState) => state.forecast