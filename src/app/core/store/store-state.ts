import {LocationWeather, Favorite, LocationShort, WeatherForecast} from '@models/models';


  export class AppState {
    favorites: Favorite[]
    details: LocationWeather = new LocationWeather()
    locations: LocationShort[]
    currentLocation: LocationShort
    forecast: WeatherForecast[]
    message: string    
  }