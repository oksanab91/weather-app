import { Injectable } from '@angular/core';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor(private helper: HelperService) { }

  mapFavorite(obj) {
    return this.mapWeatherBasic(obj)
  }

  mapWeather(obj) {
    const weather = this.mapWeatherBasic(obj)

    const humidity = obj.RelativeHumidity
    const uvindex = obj.UVIndex
    const uviText = obj.UVIndexText
    const pressure = obj.Pressure.Metric.Value
    const pressureUnit = obj.Pressure.Metric.Unit

    return {...weather,
      humidity: humidity, uvindex: uvindex, uviText: uviText, pressure: pressure, pressureUnit: pressureUnit}
  }

  mapForecast(obj) {    
    const tm = Math.round((obj.Temperature.Minimum.Value + obj.Temperature.Maximum.Value)/2)
    const fahr = this.helper.celsius2Fahrenheit(tm)           
    const weatherIcon = this.helper.setWeatherIcon(obj.Day.Icon, tm)          
    const desc = obj.Day.IconPhrase          
    const wind = obj.Day.Wind.Speed.Value
    const windUnit = obj.Day.Wind.Speed.Unit    
    const dt = obj.Date

    return {temperature: tm, weatherText: desc, temperatureF: fahr, wind: wind, 
      windUnit: windUnit, weatherIcon: weatherIcon, day: dt}    
  }

  private mapWeatherBasic(obj) {    
    const tm = Math.round(obj.Temperature.Metric.Value)
    const fahr = Math.round(obj.Temperature.Imperial.Value)
    const desc = obj.WeatherText
    const weatherIcon = this.helper.setWeatherIcon(obj.WeatherIcon, tm)
    const wind = obj.Wind.Speed.Metric.Value
    const windUnit = obj.Wind.Speed.Metric.Unit

    return {temperature: tm, weatherText: desc, temperatureF: fahr, wind: wind, 
      windUnit: windUnit, weatherIcon: weatherIcon}
  }

  mapAstr(obj) {
    return {
      id: obj.id,
      name: obj.name,
      hazardous: obj.is_potentially_hazardous_asteroid,
      dateFull: obj.close_approach_data[0].close_approach_date_full,
      diameterMin: Math.round(obj.estimated_diameter.meters.estimated_diameter_min),
      missDistance: Math.round(obj.close_approach_data[0].miss_distance.kilometers)
    }
  }
}
