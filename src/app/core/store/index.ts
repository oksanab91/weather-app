import { WeatherStore } from './weather.store';
// import { favoritesLocationsSelect, forecast$, details$, favorites$ } from './store-state';

export const stores = [
    WeatherStore
    // favoritesLocationsSelect,
    // favorites$,
    // details$,
    // forecast$
];

export * from './store-state'
export * from './weather.reducer'
export * from './weather.store'