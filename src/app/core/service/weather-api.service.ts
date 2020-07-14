import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import configApi from 'src/app/config.accuweather-api'
import { from, of } from 'rxjs';
import { mergeMap, toArray } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {  
  url: string
  isDevelopment = configApi.environment === 'dev'

  constructor(private http: HttpClient) { }

  getCurrentCondition(locationId: string) {
    if(this.isDevelopment) this.url = `${configApi.url_devpath}current-condition.json`
    else this.url = `http://${configApi.apiHost}/currentconditions/v1/${locationId}?apikey=${configApi.apiKey}&details=true`
    
    return this.http.get(this.url);   
  }

  getFavorites(filter: string[]){
    if(filter.length === 0) return of([])

    const favorites$ = from(filter).pipe(
        mergeMap( (locationId: string) => this.getCurrentCondition(locationId)),        
      toArray())
      
      return favorites$
  }

  getLocations(filter: string) {
    console.log('in get service')
    if(this.isDevelopment) this.url = `${configApi.url_devpath}locations.json`
    else this.url = `http://${configApi.apiHost}/locations/v1/cities/autocomplete?apikey=${configApi.apiKey}&q=${filter}`
   
    console.log(this.url)
    return this.http.get(this.url);   
  }

  getForecast(locationId: string) {
    if(this.isDevelopment) this.url = `${configApi.url_devpath}forecast.json`
    else this.url = `http://${configApi.apiHost}/forecasts/v1/daily/5day/${locationId}?apikey=${configApi.apiKey}&details=true&metric=true`
  
    return this.http.get(this.url);   
  }

}
