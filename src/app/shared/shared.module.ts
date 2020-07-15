import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  imports: [
    CommonModule,
    AutocompleteLibModule
  ],
  declarations: [
    AlertComponent
  ],  
  exports: [
    CommonModule,    
    AlertComponent,
    AutocompleteLibModule
  ]
})
export class SharedModule { }
