import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { WeatherCardComponent } from './weather-card/weather-card.component';

@NgModule({
  imports: [
    CommonModule,
    AutocompleteLibModule
  ],
  declarations: [
    AlertComponent,
    WeatherCardComponent
  ],  
  exports: [
    CommonModule,    
    AlertComponent,
    WeatherCardComponent,
    AutocompleteLibModule
  ]
})
export class SharedModule { }
