import { AppState } from '.';
import * as WeatherActions from './weather.actions';
import { WeatherDetails, Location, WeatherCondition, WeatherForecast } from '@models/models';


const InitAppState: AppState = {
    details: new WeatherDetails(),
    favorites: [{locationId: '215854', locationName: 'Tel Aviv', currentCondition: new WeatherCondition()}],
    locations: [{id: '215854', name: 'Tel Aviv'}],
    currentLocation: new Location(),
    forecast: [new WeatherForecast()],
    message: ''
}

export function reducer(state: AppState = InitAppState, action: WeatherActions.Actions) {

    switch(action.type) {        

        case WeatherActions.ADD_FAVORITES:
            return {...state,                
                favorites: [...state.favorites, action.payload]}

        case WeatherActions.REMOVE_FAVORITES:
                return {
                    ...state,                    
                    favorites: state.favorites.slice(action.payload, action.payload + 1)
                }

        case WeatherActions.LOAD_FAVORITES_SUCCESS:            
            return {...state,                
                favorites: [...action.payload]}

        case WeatherActions.LOAD_DETAILS_SUCCESS:    
            return {...state,
                details: {...state.details,
                    locationId: '555',
                    locationName: 'Tel Aviv',
                    currentCondition: {...action.payload}}}        

        case WeatherActions.LOAD_LOCATIONS_SUCCESS:            
            return {...state,                
                favorites: [...action.payload]}

        case WeatherActions.LOAD_FORECAST_SUCCESS:
            return {...state,                
                forecast: [...action.payload]}

        default:
            return state;
    }
}
