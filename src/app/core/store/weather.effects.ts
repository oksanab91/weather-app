import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { WeatherApiService, HelperService } from '@core/service';
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
              payload: arr }}
            ),
        catchError(error => 
        {
          console.log(error)
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
              const tm = Math.round(data.weather[0].Temperature.Metric.Value)
              const fahr = Math.round(data.weather[0].Temperature.Imperial.Value)
              const desc = data.weather[0].WeatherText
              const weatherIcon = this.helper.setWeatherIcon(data.weather[0].WeatherIcon, tm)

              return {locationId: data.location.id,
                locationName: data.location.name,    
                currentCondition: {temperature: tm, weatherText: desc, temperatureF: fahr, weatherIcon: weatherIcon}}
            })

            return { type: WeatherActions.LOAD_FAVORITES_SUCCESS, payload: favorites }}
            ),
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
          return { type: WeatherActions.ADD_FAVORITES_SUCCESS, payload: message }}
        ),
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
          return { type: WeatherActions.REMOVE_FAVORITES_SUCCESS, payload: message }}
        ),
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
        const tm = Math.round(data.weather[0].Temperature.Metric.Value)
        const fahr = Math.round(data.weather[0].Temperature.Imperial.Value)
        const desc = data.weather[0].WeatherText
        const weatherIcon = this.helper.setWeatherIcon(data.weather[0].WeatherIcon, tm)

        //forecast
        let daily = data.forecast['DailyForecasts']

        daily = daily.map(day => {
          const dt = day.Date
          const tm = Math.round((day.Temperature.Minimum.Value + day.Temperature.Maximum.Value)/2)
          const fahr = this.helper.celsius2Fahrenheit(tm)           
          const weatherIcon = this.helper.setWeatherIcon(day.Day.Icon, tm)          
          const desc = day.Day.ShortPhrase

          return {day: dt, temperature: tm, weatherText: desc, weatherIcon: weatherIcon, temperatureF: fahr}
        })
        
        return { type: WeatherActions.LOAD_WEATHER_SUCCESS, 
          payload: {details: {
            locationId: action.payload.id, 
            locationName: action.payload.name, 
            isFavorite: this.apiService.checkIsFavorite(action.payload.id),
            currentCondition: {temperature: tm, weatherText: desc, weatherIcon: weatherIcon, temperatureF: fahr}},
            forecast: daily 
          }          
          }
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

  constructor(
    private actions$: Actions,
    private apiService: WeatherApiService,
    private helper: HelperService
  ) {}
}