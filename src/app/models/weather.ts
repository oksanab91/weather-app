export class LocationWeather {
    locationId: string
    locationName: string
    isFavorite: boolean
    currentCondition: WeatherCondition = new WeatherCondition()    
}

export class WeatherCondition {
    temperature: number
    temperatureF: number
    weatherText: string
    weatherIcon: number
}

export class WeatherForecast {
    day: string
    temperature: number
    temperatureF: number
    weatherText: string
    weatherIcon: number
}
