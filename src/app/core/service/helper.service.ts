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

    setUVIiconc(val) {        
        if(val < 6) return {icon: 'fas fa-thermometer-half', class: 'low'}        
        if(val > 5 && val < 8) return {icon: 'fas fa-thermometer-full', color: 'heigh'}
        if(val > 7 && val < 11) return {icon: 'fas fa-thermometer-full', color: 'very-height'}
        else return {icon: 'fas fa-thermometer-full', color: 'extreme'}
    }

    setWindText(val) {
        if(val < 34) return 'Moderate'
        else if(val > 33 && val < 48) return 'Gale'
        else if(val > 47 && val < 56) return 'Storm'
        else if(val > 55 && val < 64) return 'Violent storm'
        else if(val > 63) return 'Hurricane'
    }

    celsius2Fahrenheit(celsius) {
        return Math.round((celsius * 1.8) + 32)
    }

    appendLeadingZeroes(n) {
        if(n <= 9){
          return "0" + n;
        }
        return n
    }

    getDayOfWeek(date: string) {
        const theDay = new Date(date)
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        return weekday[theDay.getDay()]
    }
}