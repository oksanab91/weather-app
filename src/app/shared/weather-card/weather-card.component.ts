import { Component, OnInit, Input } from '@angular/core';
import { WeatherCondition } from '@models/models';
import { HelperService } from '@core/service';
import { WeatherStore } from '@core/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {
  @Input() title: string
  @Input() weather: WeatherCondition
  tempUnit$: Observable<any>

  constructor(private helper: HelperService, private store: WeatherStore) { }

  ngOnInit(): void {
    this.tempUnit$ = this.store.temperatureUnit$
  }

  setWeatherIcon(iconNumber, temperature) {    
    return this.helper.setWeatherIcon(iconNumber, temperature)
  }
  
  setTemperature(unit) {
    if(unit.caption === 'Celsius') return this.weather.temperature
    else return this.weather.temperatureF
  }

}
