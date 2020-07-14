export class WeatherDetails {
    locationId: string
    locationName: string
    isFavorite: boolean
    currentCondition: WeatherCondition = new WeatherCondition()    
}

export class WeatherCondition {
    temperature: number
    tempUnit: string
    weatherText: string
}

export class WeatherForecast {
    day: string
    temperature: number
    tempUnit: string
    weatherText: string
}
