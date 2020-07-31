import {LocationWeather, LocationDetails, LocationShort, WeatherForecast, Alert} from '@models/models';


  export class AppState {
    favorites: LocationDetails[]
    details: LocationWeather = new LocationWeather()
    locations: LocationShort[]
    currentLocation: LocationShort
    forecast: WeatherForecast[]
    message: Alert[] = null
    tempUnit = null
    astr = null
  }