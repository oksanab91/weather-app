import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { WeatherApiService } from '@core/service';
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
              const tm = data.weather[0].Temperature.Metric.Value
              const tmUnit = data.weather[0].Temperature.Metric.Unit            
              const desc = data.weather[0].WeatherText
              const weatherIcon = data.weather[0].WeatherIcon

              return {locationId: data.location.id,
                locationName: data.location.name,    
                currentCondition: {temperature: tm, tempUnit: tmUnit, weatherText: desc, weatherIcon: weatherIcon}}
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

  loadDetails$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.LOAD_DETAILS),    
    mergeMap((action: WeatherActions.LoadDetails) => this.apiService.getCurrentCondition(action.payload.id)
    .pipe(
        map(weather => {            
            const tm = weather[0].Temperature.Metric.Value
            const tmUnit = weather[0].Temperature.Metric.Unit
            const desc = weather[0].WeatherText
            const weatherIcon = weather[0].WeatherIcon
            
            return { type: WeatherActions.LOAD_DETAILS_SUCCESS, 
              payload: {
                locationId: action.payload.id, 
                locationName: action.payload.name, 
                isFavorite: this.apiService.checkIsFavorite(action.payload.id),
                currentCondition: {temperature: tm, tempUnit: tmUnit, weatherText: desc, weatherIcon: weatherIcon}} 
              }}
            ),
        catchError(error => 
        {
          console.error(error.message)
          return of({ type: WeatherActions.SET_ALERT, 
            payload: {type: 'danger', message: 'Error loading current weather conditions'}})
        })
      )
    )
  ))

  loadForecast$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.LOAD_FORECAST),
    mergeMap((action: WeatherActions.LoadForecast) => this.apiService.getForecast(action.payload)
    .pipe(
        map(weather => {          
          let daily = weather['DailyForecasts']

          daily = daily.map(day => {
            const dt = day.Date
            const tmmin = day.Temperature.Minimum.Value            
            const tmmax = day.Temperature.Maximum.Value
            const unit = day.Temperature.Minimum.Unit            
            const desc = day.Day.ShortPhrase
            const weatherIcon = day.Day.Icon

            return {day: dt, temperature: (tmmax+tmmin)/2, tempUnit: unit, weatherText: desc, weatherIcon: weatherIcon}
          })
          
          return { type: WeatherActions.LOAD_FORECAST_SUCCESS, payload: daily }}
        ),
        catchError(error => 
        {
          console.error(error.message)
          return of({ type: WeatherActions.SET_ALERT, 
            payload: {type: 'danger', message: 'Error loading forecast'}})
        })
      )
    )
  ))

  constructor(
    private actions$: Actions,
    private apiService: WeatherApiService
  ) {}
}