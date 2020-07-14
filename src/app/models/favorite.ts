import { WeatherCondition } from '.'

export class Favorite {
    locationId: string
    locationName: string    
    currentCondition: WeatherCondition = new WeatherCondition()  
}