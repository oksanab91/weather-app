import { Component, OnInit, Input } from '@angular/core';
import { Favorite } from '@models/models';
import { HelperService } from '@core/service';
import { Observable } from 'rxjs';
import { WeatherStore } from '@core/store';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  @Input()  favorite: Favorite;
  tempUnit$: Observable<any>

  constructor(private helper: HelperService, private store: WeatherStore) { }

  ngOnInit() {
    this.tempUnit$ = this.store.temperatureUnit$
  }

  setWeatherIcon(iconNumber, temperature) {    
    return this.helper.setWeatherIcon(iconNumber, temperature)
  }
  
  setTemperature(unit) {
    if(unit.caption === 'Celsius') return this.favorite.currentCondition.temperature
    else return this.favorite.currentCondition.temperatureF
  }

  // hasMapUrl(): boolean {
  //   return this.favorite.googleMapUrl !== '';
  // }
}
