import { WeatherCondition } from './weather';

export class Favorite {
    locationId: string
    locationName: string    
    currentCondition: WeatherCondition = new WeatherCondition()  
}