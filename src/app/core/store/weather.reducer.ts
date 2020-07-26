import { AppState } from '.';
import * as WeatherActions from './weather.actions';
import { LocationWeather, LocationShort } from '@models/models';


const InitAppState: AppState = {
    details: new LocationWeather(),
    favorites: [],    
    locations: [],
    currentLocation: new LocationShort(),
    forecast: [],
    message: [],
    tempUnit: {icon: '℃', caption: 'Celsius'}
}

export function reducer(state: AppState = InitAppState, action: WeatherActions.Actions) {

    switch(action.type) {
        case WeatherActions.ADD_FAVORITES_SUCCESS:
            return {...state,                
                details: {...state.details, isFavorite: true},
                message: [...[], action.payload]
            }

        case WeatherActions.REMOVE_FAVORITES_SUCCESS:            
            return {...state,
                details: {...state.details, isFavorite: false},
                message: [...[], action.payload]
            }

        case WeatherActions.LOAD_FAVORITES_SUCCESS:                        
            return {...state,                
                favorites: [...action.payload]                
            }

        case WeatherActions.LOAD_WEATHER_SUCCESS:
            return {...state,
                details: {...action.payload.details},
                forecast: [...action.payload.forecast]            
            }

        case WeatherActions.LOAD_LOCATIONS_SUCCESS:            
            return {...state,                
                locations: [...action.payload]
            }

        case WeatherActions.REMOVE_ALERT:            
            return {...state, 
                message: []
            }            

        case WeatherActions.SET_ALERT:            
            return {...state,                
                message: [...[], action.payload]
            }

        case WeatherActions.RESET_ALERT:                        
            return {...state,                
                message: []
            }

        case WeatherActions.SET_TEMP_UNIT:
            let unit = null
            if(action.payload === 'C') unit = {icon: '℃', caption: 'Celsius'}
            if(action.payload === 'F') unit = {icon: '℉', caption: 'Fahrenheit'}

            return {...state,
                tempUnit: {...unit },
                details: {...state.details, 
                    currentCondition: {...state.details.currentCondition}}                 
            }

        default:
            return state;
    }
}
