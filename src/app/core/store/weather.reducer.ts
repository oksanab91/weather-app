import { AppState } from '.';
import * as WeatherActions from './weather.actions';
import { LocationWeather, LocationShort, WeatherForecast } from '@models/models';


const InitAppState: AppState = {
    details: new LocationWeather(),
    favorites: [],    
    locations: [],
    currentLocation: new LocationShort(),
    forecast: [new WeatherForecast()],
    message: ''
}

export function reducer(state: AppState = InitAppState, action: WeatherActions.Actions) {

    switch(action.type) {
        case WeatherActions.ADD_FAVORITES_SUCCESS:
            return {...state,                
                details: {...state.details, isFavorite: true},
                message: action.payload
            }

        case WeatherActions.REMOVE_FAVORITES_SUCCESS:
            return {...state,
                details: {...state.details, isFavorite: false},
                message: action.payload
            }

        case WeatherActions.LOAD_FAVORITES_SUCCESS:                        
            return {...state,                
                favorites: [...action.payload]                
            }   

        case WeatherActions.LOAD_DETAILS_SUCCESS:    
            return {...state,
                details: {...action.payload}}                       

        case WeatherActions.LOAD_LOCATIONS_SUCCESS:            
            return {...state,                
                locations: [...action.payload]}

        case WeatherActions.LOAD_FORECAST_SUCCESS:
            return {...state,                
                forecast: [...action.payload]}

        default:
            return state;
    }
}
