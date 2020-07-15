import { LocationWeather, WeatherCondition, WeatherForecast } from './weather';
import { LocationShort } from './location';
import { Favorite } from './favorite';

export const models = [    
    LocationWeather,
    WeatherCondition,
    WeatherForecast,
    LocationShort,
    Favorite 
];

export * from './alert'
export * from './weather'
export * from './favorite'
export * from './location'