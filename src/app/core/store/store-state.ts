import {WeatherDetails, Favorite, Location, WeatherForecast} from '@models/models';


  export class AppState {
    favorites: Favorite[]
    details: WeatherDetails = new WeatherDetails()
    locations: Location[]
    currentLocation: Location
    forecast: WeatherForecast[]
    message: string    
  }
