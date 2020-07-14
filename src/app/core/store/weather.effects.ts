import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { WeatherApiService } from '@core/service';
import * as WeatherActions from './weather.actions';

 
@Injectable()
export class WeatherEffects {
 
  loadLocations$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.LOAD_LOCATIONS),
    mergeMap(() => this.apiService.getLocations('')
    .pipe(
        map(locations => {
            console.log(locations)
            return { type: WeatherActions.LOAD_LOCATIONS_SUCCESS, payload: locations }}
            ),
        catchError(() => EMPTY)
      )
    )
  ))

  //[{id: '215854', name: 'Tel Aviv'}]
  loadFavorites$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.LOAD_FAVORITES),
    mergeMap(() => this.apiService.getFavorites(['215854'])
    .pipe(
        map(favorites => {            
            favorites = favorites.map(weather => {
              const tm = weather[0].Temperature.Metric.Value
              const tmUnit = weather[0].Temperature.Metric.Unit            
              const desc = weather[0].WeatherText

              return {locationId: '215854',
                locationName: 'Tel Aviv',    
                currentCondition: {temperature: tm, tempUnit: tmUnit, weatherText: desc}}
            })

            return { type: WeatherActions.LOAD_FAVORITES_SUCCESS, payload: favorites }}
            ),
        catchError(() => EMPTY)
      )
    )
  ))
 

  loadDetails$ = createEffect(() => this.actions$.pipe(
    ofType(WeatherActions.LOAD_DETAILS),    
    mergeMap((action: WeatherActions.LoadDetails) => this.apiService.getCurrentCondition(action.payload)
    .pipe(
        map(weather => {            
            const tm = weather[0].Temperature.Metric.Value
            const tmUnit = weather[0].Temperature.Metric.Unit            
            const desc = weather[0].WeatherText
             
            return { type: WeatherActions.LOAD_DETAILS_SUCCESS, 
              payload: {temperature: tm, tempUnit: tmUnit, weatherText: desc} }}
            ),
        catchError(() => EMPTY)
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

            return {day: dt, temperature: (tmmax+tmmin)/2, tempUnit: unit, weatherText: desc}
          })                   
          
          console.log(daily)
          return { type: WeatherActions.LOAD_FORECAST_SUCCESS, payload: daily }}
        ),
        catchError(() => EMPTY)
      )
    )
  ))

  constructor(
    private actions$: Actions,
    private apiService: WeatherApiService
  ) {}
}