import { WeatherDetails, WeatherCondition, WeatherForecast } from './weather';
import { Location } from './location';
import { Favorite } from './favorite';

export const models = [    
    WeatherDetails,
    WeatherCondition,
    WeatherForecast,
    Location,
    Favorite 
];

export * from './alert'
export * from './weather'
export * from './favorite'
export * from './location'