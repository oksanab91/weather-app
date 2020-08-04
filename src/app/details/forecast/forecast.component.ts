import { Component, Input } from '@angular/core';
import { WeatherForecast } from '@models/models';
import { HelperService } from '@core/service';

@Component({
  selector: 'forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent {
  @Input()  forecast: WeatherForecast[]
  @Input() temperatureUnit
  
  constructor(private helper: HelperService) {
  }

  setWeatherIcon(iconNumber, temperature) {    
    return this.helper.setWeatherIcon(iconNumber, temperature)
  }

  setTemperature(weather) {
    if(this.temperatureUnit.caption === 'Celsius') return weather.temperature
    else return weather.temperatureF
  }

  getDayOfWeek(date) {
    return this.helper.getDayOfWeek(date)
  }

  trackByFn(index, item) {
    return item.day
  }
}
