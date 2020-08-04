import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { WeatherCondition } from '@models/models';
import { HelperService } from '@core/service';
import { WeatherStore } from '@core/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'weather-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {
  @Input() title: string
  @Input() weather: WeatherCondition
  tempUnit$: Observable<any>
  wind = null

  constructor(private helper: HelperService, private store: WeatherStore) { }

  ngOnInit(): void {
    this.tempUnit$ = this.store.temperatureUnit$
  }

  setTemperature(unit) {
    if(unit.caption === 'Celsius') return this.weather.temperature
    else return this.weather.temperatureF
  }

  setWind() {    
    if(this.weather.wind === 0) this.wind = {icon: '', caption: ''}
    else this.wind = {icon: 'fas fa-wind', caption: this.helper.setWindText(this.weather.wind)}
    return this.wind        
  }

  // hasMapUrl(): boolean {
  //   return this.favorite.googleMapUrl !== '';
  // }

}
