import { AlertService } from './alert.service';
import { WeatherApiService } from './weather-api.service';


export const services = [
    AlertService, WeatherApiService
];

export * from './alert.service'
export * from './weather-api.service'