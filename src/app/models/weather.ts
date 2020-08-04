export class LocationDetails {
    locationId: string
    locationName: string    
    currentCondition: WeatherCondition = new WeatherCondition()  
}

export class LocationWeather extends LocationDetails{
    isFavorite: boolean  
}

export class WeatherCondition {
    temperature: number
    temperatureF: number
    weatherText: string
    weatherIcon: number
    wind: number
    windUnit: string
    uvindex: string
    uviText: string
    pressure: number
    pressureUnit: string
}

export class WeatherForecast extends WeatherCondition{
    day: string
}
