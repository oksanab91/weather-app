import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class HelperService {  
    constructor() { }

    setWeatherIcon(iconNumber, temperature) {
        try {
            if(iconNumber > 0 && iconNumber < 3 || iconNumber == 33 || iconNumber == 34) return 'fas fa-sun' 
            else if(iconNumber == 3 || iconNumber == 4 || iconNumber == 35 || iconNumber == 36) return 'fas fa-cloud-sun'
            else if(iconNumber > 4 && iconNumber < 11 || iconNumber == 38) return 'fas fa-cloud'
            else if(iconNumber == 11 || iconNumber == 37 ) return 'fas fa-smog'
            else if(iconNumber == 14 || iconNumber == 17) return 'fas fa-cloud-sun-rain'
            else if(iconNumber > 11 && iconNumber < 14 || iconNumber == 16) return 'fas fa-cloud-showers-heavy'
            else if(iconNumber == 15 || iconNumber == 41 || iconNumber == 42) return 'fas fa-poo-storm'
            else if(iconNumber == 16 || iconNumber == 17) return 'fas fa-bolt'
            else if(iconNumber == 18 || iconNumber == 39 || iconNumber == 40) return 'fas fa-cloud-rain'
            else if(iconNumber > 18 && iconNumber < 22 || iconNumber == 26 || iconNumber == 29 || iconNumber == 32) return 'fas fa-wind'
            else if(iconNumber > 21 && iconNumber < 30 || iconNumber == 43 || iconNumber == 44) return 'fas fa-snowflake'
            else if(iconNumber == 30 || temperature > 0) return 'fas fa-temperature-high'
            else if(iconNumber == 31 || temperature <= 0) return 'fas fa-temperature-low'
            
            return 'fas fa-feather'
        }
        catch(err) {
            console.error(err)
            return 'fas fa-feather'
        }

    }

    celsius2Fahrenheit(celsius) {
        return Math.round((celsius * 1.8) + 32)
    }
}