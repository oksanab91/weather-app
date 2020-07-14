import { Action } from '@ngrx/store'
import { Favorite } from '@models/models'

export const ADD_FAVORITES      = '[FAVORITES] Add'
export const REMOVE_FAVORITES   = '[FAVORITES] Remove'
export const LOAD_FAVORITES     = '[FAVORITES] Load'
export const LOAD_DETAILS       = '[DETAILS] Load'
export const LOAD_LOCATIONS     = '[LOCATIONS] Load'
export const LOAD_FORECAST      = '[FORECAST] Load'
export const LOAD_FAVORITES_SUCCESS     = '[FAVORITES] Load Success'
export const LOAD_DETAILS_SUCCESS       = '[DETAILS] Load Success'
export const LOAD_LOCATIONS_SUCCESS     = '[LOCATIONS] Load Success'
export const LOAD_FORECAST_SUCCESS      = '[FORECAST] Load Success'


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
    constructor(public payload: Favorite) {}
}
export class RemoveFavorites implements Action {
    readonly type = REMOVE_FAVORITES
    constructor(public payload: number) {}
}

export class LoadDetails implements Action {
    readonly type = LOAD_DETAILS
    constructor(public payload: any) {}
}
export class LoadDetailsSuccess implements Action {
    readonly type = LOAD_DETAILS_SUCCESS
    constructor(public payload: any) {}
}

export class LoadLocations implements Action {
    readonly type = LOAD_LOCATIONS
    constructor() {}
}
export class LoadLocationsSuccess implements Action {
    readonly type = LOAD_LOCATIONS_SUCCESS
    constructor(public payload: any) {}
}

export class LoadForecast implements Action {
    readonly type = LOAD_FORECAST
    constructor(public payload: any) {}
}
export class LoadForecastSuccess implements Action {
    readonly type = LOAD_FORECAST_SUCCESS
    constructor(public payload: any) {}
}

export type Actions = 
    LoadFavorites | LoadFavoritesSuccess |
    LoadDetails | LoadDetailsSuccess |    
    AddFavorites | RemoveFavorites |
    LoadLocations | LoadLocationsSuccess |
    LoadForecast | LoadForecastSuccess
