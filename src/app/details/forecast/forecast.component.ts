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
  
  constructor(private helper: HelperService) {
  }

  roundTemperature(temp) {
    return Math.round(temp)
  }

  setWeatherIcon(iconNumber, temperature) {    
    return this.helper.setWeatherIcon(iconNumber, temperature)
  }

  trackByFn(index, item) {
    return item.id
  }
}
