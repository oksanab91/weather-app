import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { LocationWeather } from 'src/app/models';
import { WeatherStore } from '@core/store';
import { HelperService } from '@core/service';

@Component({
  selector: 'weather',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  @Input()  details: LocationWeather
  @Input() temperatureUnit
  @Input() astrConditions
  showAstr = false
  uvi = null
  wind = null

  constructor(private store: WeatherStore, private helper: HelperService) { }

  ngOnInit(): void {    
  }

  updateFavorite(){       
    if(this.details.isFavorite) this.store.removeFavorite(this.details.locationId)
    else this.store.addFavorite({id: this.details.locationId, name: this.details.locationName})
  }

  setFavoriteIcon() {
    if(this.details.isFavorite) return {icon: 'fas fa-bookmark', caption: 'Remove\nFavorite'}
    else return {icon: 'far fa-bookmark', caption: 'Add\nFavorite'}
  }

  switchTempUnit(unit) {
    let currentUnit = 'C'
    if(unit.caption == 'Celsius') currentUnit = 'F'
    this.store.setTempUnit(currentUnit)
  }

  setTemperature() {
    if(this.temperatureUnit.caption == 'Celsius') return this.details.currentCondition.temperature
    else return this.details.currentCondition.temperatureF
  }

  setAstr() {
    if(this.astrConditions.name) return 'fas fa-meteor'
    else return ''
  }

  setWind() {
    if(this.details.currentCondition.wind === 0) this.wind = {icon: '', caption: ''}
    this.wind = {icon: 'fas fa-wind', caption: this.helper.setWindText(this.details.currentCondition.wind)}
    return this.wind        
  }

  setUVI() {
    this.uvi = this.helper.setUVIiconc(this.details.currentCondition.uvindex)
    return this.uvi
  }

  showDescript() {
    this.showAstr = !this.showAstr;
    this.store.resetAlerts()
    if (!this.showAstr) return

    const descr = `Near Earth Asteroid ${this.astrConditions.name} ${this.astrConditions.diameterMin} 
      meters accross will pass at a distance of ${this.astrConditions.missDistance} kilometers`

    this.store.setAlert({type: 'info', message: descr})    
  }
}
