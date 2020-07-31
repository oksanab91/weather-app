import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LocationWeather, LocationShort, WeatherForecast } from '@models/models';
import { Observable, combineLatest } from 'rxjs';
import { WeatherStore } from '@core/store';
import { Location, registerLocaleData } from '@angular/common';
import { fadeInAnimation } from 'src/app/app-animations';
import en from '@angular/common/locales/en';


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
  astrConditions$: Observable<any>
  
  constructor(private loc:Location, private store: WeatherStore) {
    const param = this.loc.getState()

    if(param && param['id']) {
      this.locationInit.id = param['id']
      this.locationInit.name = param['name']
    }
    else this.locationInit = this.defaultLocation   

    this.store.loadWeather(this.locationInit)
    this.store.loadAstrConditions()  
  }

  ngOnInit(): void {
    registerLocaleData(en)
    
    this.details$ = this.store.details$
    this.forecast$ = this.store.forecast$
    this.tempUnit$ = this.store.temperatureUnit$
    this.astrConditions$ = this.store.astrConditions$      
    this.store.resetAlerts()
  }

  get combined$(){
    return combineLatest(
      this.details$,
      this.forecast$,
      this.tempUnit$,
      this.astrConditions$,
      (detail, forecast, unit, astr) => {return {detail, forecast, unit, astr}})  
  }
 
}
