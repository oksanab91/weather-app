import { Component, Input } from '@angular/core';
import { WeatherForecast } from '@models/models';
import { WeatherStore } from '@core/store';

@Component({
  selector: 'forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent {
  @Input()  forecast: WeatherForecast[]
  
  constructor(private store: WeatherStore) {
  }

  roundTemperature(temp) {
    return Math.round(temp)
  }

  trackByFn(index, item) {
    return item.id
  }
}
