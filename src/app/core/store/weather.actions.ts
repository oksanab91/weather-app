import { Action } from '@ngrx/store'
import { LocationShort } from '@models/models'


export const ADD_FAVORITES      = '[FAVORITES] Add'
export const REMOVE_FAVORITES   = '[FAVORITES] Remove'
export const LOAD_FAVORITES     = '[FAVORITES] Load'
export const LOAD_WEATHER       = '[WEATHER] Load'
export const LOAD_LOCATIONS     = '[LOCATIONS] Load'
export const LOAD_ASTR          = '[ASTR] Load'
export const SET_ALERT          = '[ALERT] Set'
export const REMOVE_ALERT       = '[ALERT] Remove'
export const RESET_ALERT        = '[ALERT] Reset'
export const SET_TEMP_UNIT      = '[Unit] Set'
export const ADD_FAVORITES_SUCCESS      = '[FAVORITES] Add Success'
export const REMOVE_FAVORITES_SUCCESS   = '[FAVORITES] Remove Success'
export const LOAD_FAVORITES_SUCCESS     = '[FAVORITES] Load Success'
export const LOAD_WEATHER_SUCCESS       = '[WEATHER] Load Success'
export const LOAD_LOCATIONS_SUCCESS     = '[LOCATIONS] Load Success'
export const LOAD_ASTR_SUCCESS          = '[ASTR] Load Success'



export class LoadFavorites implements Action {
    readonly type = LOAD_FAVORITES
    constructor() {}
}
export class LoadFavoritesSuccess implements Action {
    readonly type = LOAD_FAVORITES_SUCCESS
    constructor(public payload: any) {}
}

export class AddFavorites implements Action {
    readonly type = ADD_FAVORITES
    constructor(public payload: LocationShort) {}
}
export class AddFavoritesSuccess implements Action {
    readonly type = ADD_FAVORITES_SUCCESS
    constructor(public payload: any) {}
}
export class RemoveFavorites implements Action {
    readonly type = REMOVE_FAVORITES
    constructor(public payload: number) {}
}
export class RemoveFavoritesSuccess implements Action {
    readonly type = REMOVE_FAVORITES_SUCCESS
    constructor(public payload: any) {}
}

export class LoadWeather implements Action {
    readonly type = LOAD_WEATHER
    constructor(public payload: any) {}
}
export class LoadWeatherSuccess implements Action {
    readonly type = LOAD_WEATHER_SUCCESS
    constructor(public payload: any) {}
}

export class LoadLocations implements Action {
    readonly type = LOAD_LOCATIONS
    constructor(public payload: any) {}
}
export class LoadLocationsSuccess implements Action {
    readonly type = LOAD_LOCATIONS_SUCCESS
    constructor(public payload: any) {}
}

export class RemoveAlert implements Action {
    readonly type = REMOVE_ALERT
    constructor(public payload: any) {}
}
export class SetAlert implements Action {
    readonly type = SET_ALERT
    constructor(public payload: any) {}
}
export class ResetAlerts implements Action {
    readonly type = RESET_ALERT
    constructor() {}
}

export class SetTempUnit implements Action {
    readonly type = SET_TEMP_UNIT
    constructor(public payload: any) {}
}

export class LoadAstr implements Action {
    readonly type = LOAD_ASTR
    constructor() {}
}
export class LoadAstrSuccess implements Action {
    readonly type = LOAD_ASTR_SUCCESS
    constructor(public payload: any) {}
}

export type Actions = 
    LoadFavorites | LoadFavoritesSuccess |
    AddFavorites | RemoveFavorites |
    AddFavoritesSuccess | RemoveFavoritesSuccess |
    LoadLocations | LoadLocationsSuccess |
    RemoveAlert | SetAlert | ResetAlerts |
    LoadWeather | LoadWeatherSuccess | SetTempUnit |
    LoadAstr | LoadAstrSuccess
