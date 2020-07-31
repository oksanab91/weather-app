import { Component, OnInit, Input } from '@angular/core';
import { LocationWeather } from 'src/app/models';
import { WeatherStore } from '@core/store';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  @Input()  details: LocationWeather
  @Input() temperatureUnit
  @Input() astrConditions
  showAstr = false

  constructor(private store: WeatherStore) { }

  ngOnInit(): void {
  }

  updateFavorite(item: LocationWeather){       
    if(item.isFavorite) this.store.removeFavorite(item.locationId)
    else this.store.addFavorite({id: item.locationId, name: item.locationName})
  }

  setFavoriteIcon(isFavorite) {
    if(isFavorite) return {icon: 'fas fa-bookmark', caption: 'Remove\nFavorite'}
    else return {icon: 'far fa-bookmark', caption: 'Add\nFavorite'}
  }

  switchTempUnit(unit) {
    let currentUnit = 'C'
    if(unit.caption == 'Celsius') currentUnit = 'F'
    this.store.setTempUnit(currentUnit)
  }

  setTemperature(details, unit) {
    if(unit.caption == 'Celsius') return details.currentCondition.temperature
    else return details.currentCondition.temperatureF
  }

  setAstr(astr) {
    if(astr) return 'fas fa-meteor'
    else return ''
  }

  collapse() {
    this.showAstr = !this.showAstr;
  }
}
