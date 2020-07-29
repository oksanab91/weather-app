import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LocationWeather, LocationShort, WeatherForecast } from '@models/models';
import { Observable, combineLatest } from 'rxjs';
import { WeatherStore } from '@core/store';
import { Location } from '@angular/common';
import { fadeInAnimation } from 'src/app/app-animations';


@Component({
  selector: 'weather-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
  animations: [fadeInAnimation]
})
export class WeatherDetailsComponent implements OnInit {
  locationInit: LocationShort = new LocationShort()  
  defaultLocation: LocationShort = {id: '215854', name: 'Tel Aviv'}
  details$: Observable<LocationWeather>
  forecast$: Observable<WeatherForecast[]>
  tempUnit$: Observable<any>
  
  constructor(private loc:Location, private store: WeatherStore) {
    const param = this.loc.getState()

    if(param && param['id']) {
      this.locationInit.id = param['id']
      this.locationInit.name = param['name']
    }
    else this.locationInit = this.defaultLocation   

    this.store.loadWeather(this.locationInit)  
  }

  ngOnInit(): void {
    this.details$ = this.store.details$
    this.forecast$ = this.store.forecast$
    this.tempUnit$ = this.store.temperatureUnit$      
    this.store.resetAlerts()
  }

  get combined$(){
    return combineLatest(
      this.details$,
      this.forecast$,
      this.tempUnit$,
      (detail, forecast, unit) => {return {detail, forecast, unit}})  
  }
  
  updateFavorite(item: LocationWeather){       
    if(item.isFavorite) this.store.removeFavorite(item.locationId)
    else this.store.addFavorite({id: item.locationId, name: item.locationName})
  }

  setFavoriteIcon(isFavorite) {
    if(isFavorite) return {icon: 'fas fa-bookmark', caption: 'Remove\nFavorite'}
    else return {icon: 'far fa-bookmark', caption: 'Add\nFavorite'}
  }

  switchTempUnit(unit) {
    let currentUnit = 'C'
    if(unit.caption == 'Celsius') currentUnit = 'F'
    this.store.setTempUnit(currentUnit)
  }

  setTemperature(details, unit) {
    if(unit.caption == 'Celsius') return details.currentCondition.temperature
    else return details.currentCondition.temperatureF
  }
}
