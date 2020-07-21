import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, of, Observable, forkJoin } from 'rxjs';
import { mergeMap, toArray, map } from 'rxjs/operators';
import { LocationShort } from 'src/app/models';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {  
  url: string  
  isDevelopment = environment.apiTest
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'text/plain'      
  })
  private favoritesList: LocationShort[] = []
  
  constructor(private http: HttpClient) { }

  checkIsFavorite(locationId){
    return this.favoritesList.findIndex(fav => fav.id == locationId) >= 0
  }

  addFavorite(favorite){    
    this.favoritesList = [...this.favoritesList, favorite]
    return of('success')
  }

  removeFavorite(locationId){    
    const ind = this.favoritesList.findIndex(fav => fav.id == locationId)

    if(ind < 0) return of('success')
    if(this.favoritesList.length === 1) this.favoritesList = []
          
    this.favoritesList = [...this.favoritesList.slice(0, ind),
    ...this.favoritesList.slice(ind + 1)]    

    return of('success')
  }  

  getFavorites(){    
    if(this.favoritesList.length === 0) return of([])

    try {
      const favorites$ = from(this.favoritesList).pipe(
          mergeMap((location) => {
            return  forkJoin([
              of(location),
              this.getCurrentCondition(location.id)
            ]).pipe( map(([location, weather]) => {return { location, weather }})
            )
          }),        
        toArray())

      return favorites$
    }
    catch(error){ return of(error) }
  }

  getLocations(filter: string): Observable<any[]> {    
    if(this.isDevelopment) this.url = `${environment.apis.url_devpath}locations.json`
    else this.url = `${environment.apis.api_url}/locations/v1/cities/autocomplete?apikey=${environment.apis.apiKey}&q=${filter}`
    
    let data$ = this.http.get<any[]>(this.url,  {headers: this.headers})

    if(this.isDevelopment){      
      data$ = data$.pipe(map(val => {
        const rx = new RegExp(filter.toLowerCase(), 'i');
        return val.filter(item => { return rx.test(item.LocalizedName.toLowerCase()) })
        }
      ))
    }
    return data$   
  }  

  getWeather(locationId: string) {
    return forkJoin([this.getCurrentCondition(locationId), this.getForecast(locationId)])
      .pipe(map(([weather, forecast]) => {return { weather, forecast }}) )   
  }

  private getForecast(locationId: string) {
    if(this.isDevelopment) this.url = `${environment.apis.url_devpath}forecast.json`
    else this.url = `${environment.apis.api_url}/forecasts/v1/daily/5day/${locationId}?apikey=${environment.apis.apiKey}&details=true&metric=true`
  
    return this.http.get(this.url, {headers: this.headers});   
  }
  
  private getCurrentCondition(locationId: string) {    
    if(this.isDevelopment) this.url = `${environment.apis.url_devpath}current-condition.json`
    else this.url = `${environment.apis.api_url}/currentconditions/v1/${locationId}?apikey=${environment.apis.apiKey}&details=true`
    
    return this.http.get(this.url, {headers: this.headers});   
  }

}
