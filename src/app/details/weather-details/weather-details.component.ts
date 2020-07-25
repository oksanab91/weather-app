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
  tempUnit$: Observable<any>
  toggleOn = false

  constructor(private loc:Location, private store: WeatherStore) {
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
    this.tempUnit$ = this.store.temperatureUnit$   
    this.store.resetAlerts()
  }

  updateFavorite(item: LocationWeather){       
    if(item.isFavorite) this.store.removeFavorite(item.locationId)
    else this.store.addFavorite({id: item.locationId, name: item.locationName})
  }

  setFavoriteIcon(isFavorite) {
    if(isFavorite) return {icon: 'fas fa-bookmark', caption: 'Remove\nFavorite'}
    else return {icon: 'far fa-bookmark', caption: 'Add\nFavorite'}
  }

  setTempUnit() {    
    this.toggleOn = !this.toggleOn
    console.log(this.toggleOn)

    if (this.toggleOn) this.store.setTempUnit('F')
    else this.store.setTempUnit('C')
  }

  setTemperature(details) {
    console.log(this.toggleOn)
    if(this.toggleOn) return details.currentCondition.temperatureF
    else return details.currentCondition.temperature
  }
}
