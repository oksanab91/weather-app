import { Action } from '@ngrx/store'
import { LocationShort } from '@models/models'


export const ADD_FAVORITES      = '[FAVORITES] Add'
export const REMOVE_FAVORITES   = '[FAVORITES] Remove'
export const LOAD_FAVORITES     = '[FAVORITES] Load'
export const LOAD_DETAILS       = '[DETAILS] Load'
export const LOAD_LOCATIONS     = '[LOCATIONS] Load'
export const LOAD_FORECAST      = '[FORECAST] Load'
export const SET_ALERT          = '[ALERT] Set'
export const REMOVE_ALERT       = '[ALERT] Remove'
export const RESET_ALERT        = '[ALERT] Reset'
export const ADD_FAVORITES_SUCCESS      = '[FAVORITES] Add Success'
export const REMOVE_FAVORITES_SUCCESS   = '[FAVORITES] Remove Success'
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
    constructor(public payload: any) {}
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



export type Actions = 
    LoadFavorites | LoadFavoritesSuccess |
    LoadDetails | LoadDetailsSuccess |    
    AddFavorites | RemoveFavorites |
    AddFavoritesSuccess | RemoveFavoritesSuccess |
    LoadLocations | LoadLocationsSuccess |
    LoadForecast | LoadForecastSuccess |
    RemoveAlert | SetAlert | ResetAlerts
