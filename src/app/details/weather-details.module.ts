import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { NavSearchComponent } from './nav-search/nav-search.component';
import { WeatherDetailsComponent } from './weather-details/weather-details.component';
import { ForecastComponent } from './forecast/forecast.component';
import { WeatherStore } from '@core/store';


@NgModule({
    declarations: [
      NavSearchComponent,
      ForecastComponent,
      WeatherDetailsComponent     
    ],
    imports: [
      CommonModule,      
      SharedModule,      
      RouterModule.forChild([{ path: '', component: WeatherDetailsComponent}])        
    ],
    providers: [WeatherStore]
  })
  export class WeatherDetailsModule { }