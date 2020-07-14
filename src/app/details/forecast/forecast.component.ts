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
  @Input()  locationId: number;
  forecast$: Observable<WeatherForecast[]>
  constructor(private store: WeatherStore) {
    this.store.loadForecast(this.locationId)
   }

  ngOnInit(): void {
    this.forecast$ = this.store.forecast$
  }

  trackByFn(index, item) {
    return item.id
  }
}
