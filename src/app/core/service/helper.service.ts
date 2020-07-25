import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class HelperService {  
    constructor() { }

    setWeatherIcon(iconNumber, temperature) {
        try {
            if(iconNumber > 0 && iconNumber < 3) return 'fas fa-sun' 
            else if(iconNumber == 3 || iconNumber == 4 ) return 'fas fa-cloud-sun'
            else if(iconNumber > 4 && iconNumber < 11 ) return 'fas fa-cloud'
            else if(iconNumber == 11 ) return 'fas fa-smog'
            else if(iconNumber == 14 || iconNumber == 17) return 'fas fa-cloud-sun-rain'
            else if(iconNumber > 11 && iconNumber < 14 || iconNumber == 16) return 'fas fa-cloud-showers-heavy'
            else if(iconNumber == 15) return 'fas fa-poo-storm'
            else if(iconNumber == 16 || iconNumber == 17) return 'fas fa-bolt'
            else if(iconNumber == 18) return 'fas fa-cloud-rain'
            else if(iconNumber > 18 && iconNumber < 22 || iconNumber == 26 || iconNumber == 29) return 'fas fa-wind'
            else if(iconNumber > 21 && iconNumber < 30) return 'fas fa-snowflake'
            else if(temperature > 0) return 'fas fa-temperature-high'
            else if(temperature <= 0) return 'fas fa-temperature-low'
            
            return 'fas fa-feather'
        }
        catch(err) {
            return 'fas fa-feather'
        }

    }

    // setWeatherUnit(unit: string) {
    //     if(unit === 'C') return {icon: '℃', caption: 'Celsius'}
    //     if(unit === 'F') return {icon: '℉', caption: 'Fahrenheit'}
    // }

    celsius2Fahrenheit(celsius) {
        console.log(celsius)
        return Math.round((celsius * 1.8) + 32)
    }
}