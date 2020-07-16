import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherForecast } from '@models/models';
import { WeatherStore } from '@core/store';

@Component({
  selector: 'forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  @Input()  locationId: string;
  forecast$: Observable<WeatherForecast[]>

  constructor(private store: WeatherStore) {
    this.store.loadForecast(this.locationId)
   }

  ngOnInit(): void {
    this.forecast$ = this.store.forecast$
  }

  roundTemperature(temp) {
    return Math.round(temp)
  }

  trackByFn(index, item) {
    return item.id
  }
}
