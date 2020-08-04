import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { WeatherApiService, MapperService } from '@core/service';
import * as WeatherActions from './weather.actions';
import { of } from 'rxjs';

 
@Injectable()
export class WeatherEffects { 
  loadLocations$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.LOAD_LOCATIONS),
    mergeMap((action: WeatherActions.LoadLocations) => this.apiService.getLocations(action.payload)
    .pipe(
        map(locations => {            
          const arr = locations.map(item => {return {id: item.Key, name: item.LocalizedName}})            
          return { type: WeatherActions.LOAD_LOCATIONS_SUCCESS, 
            payload: arr }
        }),
        catchError(error => 
        {
          console.error(error)
          return of({ type: WeatherActions.SET_ALERT, 
            payload: {type: 'danger', message: 'Error loading locations'} })
        })        
      )
    )
  ))

  loadFavorites$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.LOAD_FAVORITES),
    mergeMap(() => this.apiService.getFavorites()
    .pipe(
        map(favorites => {            
          favorites = favorites.map(data => {
            const weather =  this.mapper.mapFavorite(data.weather[0])
            return {locationId: data.location.id, locationName: data.location.name, currentCondition: weather}
          })

          return { type: WeatherActions.LOAD_FAVORITES_SUCCESS, payload: favorites }
        }),
        catchError(error => 
        {
          console.error(error.message)
          return of({ type: WeatherActions.SET_ALERT, 
            payload: {type: 'danger', message: 'Error loading favorites'}})
        })
      )
    )
  ))  

  addFavorites$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.ADD_FAVORITES),    
    mergeMap((action: WeatherActions.AddFavorites) => this.apiService.addFavorite(action.payload)
    .pipe(
        map(result => {
          const message = {type: 'success', message: 'Location added to the favorites'}         
          return { type: WeatherActions.ADD_FAVORITES_SUCCESS, payload: message }
      }),
      catchError(error => 
      {
        console.error(error.message)
        return of({ type: WeatherActions.SET_ALERT, 
        payload: {type: 'danger', message: 'Error adding favorite'} })
      })
      )
    )
  ))
  
  removeFavorites$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.REMOVE_FAVORITES),    
    mergeMap((action: WeatherActions.RemoveFavorites) => this.apiService.removeFavorite(action.payload)
    .pipe(
        map(result => {
          const message = {type: '', message: 'Location removed from favorites'}          
          return { type: WeatherActions.REMOVE_FAVORITES_SUCCESS, payload: message }
        }),
        catchError(error =>
        { 
          console.error(error.message)
          return of({ type: WeatherActions.SET_ALERT, 
          payload: {type: 'danger', message: 'Error removing favorite'} })
        })
      )
    )
  ))

  
  loadWeather$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.LOAD_WEATHER),    
    mergeMap((action: WeatherActions.LoadWeather) => this.apiService.getWeather(action.payload.id)
    .pipe(
      map(data => {
        //weather condition
        const weather =  this.mapper.mapWeather(data.weather[0])

        //forecast
        let daily = data.forecast['DailyForecasts']
        daily = daily.map(day => this.mapper.mapForecast(day) )

        return { type: WeatherActions.LOAD_WEATHER_SUCCESS, 
          payload: {
            details: {
              locationId: action.payload.id, 
              locationName: action.payload.name, 
              isFavorite: this.apiService.checkIsFavorite(action.payload.id),
              currentCondition: weather
            },
            forecast: daily 
          }} 
      }),
      catchError(error => 
      {
        console.error(error.message)
        return of({ type: WeatherActions.SET_ALERT, 
        payload: {type: 'danger', message: 'Error loading weather'} })
      })
      )
    )
  ))

  loadAstrConditions$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.LOAD_ASTR),
    mergeMap((action: WeatherActions.LoadAstr) => this.apiService.getAstrCondition()
    .pipe(
        map(conditions => {            
            const data = conditions['near_earth_objects']
            let arr = []

            for (let date in data){
              let theDate = data[date]
              
              theDate = theDate.map(element => {
                return this.mapper.mapAstr(element)
              })
              arr = [...arr, ...theDate]
            }

            if(arr.find(val => val.hazardous)) arr = arr.filter(val => val.hazardous)

            arr.sort((a, b) => (a.missDistance - b.missDistance))          
            return { type: WeatherActions.LOAD_ASTR_SUCCESS, payload: arr.length>0 ? arr[0] : {} }
        }),
        catchError(error => 
        {
          console.error(error.message)
          return of({ type: WeatherActions.SET_ALERT, 
            payload: {type: 'danger', message: 'Error loading astr.'} })
        })        
      )
    )
  ))

  constructor(
    private actions$: Actions,
    private apiService: WeatherApiService,
    private mapper: MapperService
  ) {}
}