import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LocationWeather, LocationShort, WeatherForecast } from '@models/models';
import { Observable } from 'rxjs';
import { WeatherStore } from '@core/store';
import { Location } from '@angular/common';
import { fadeInAnimation } from 'src/app/app-animations';
import { HelperService } from '@core/service';

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

  constructor(private loc:Location, 
              private store: WeatherStore, private helper: HelperService) {
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
    this.store.resetAlerts()
  }

  updateFavorite(item: LocationWeather){       
    if(item.isFavorite) this.store.removeFavorite(item.locationId)
    else this.store.addFavorite({id: item.locationId, name: item.locationName})
  }

  setWeatherIcon(iconNumber, temperature) {    
    return this.helper.setWeatherIcon(iconNumber, temperature)
  }

}
