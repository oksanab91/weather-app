import { Component, Input } from '@angular/core';
import { fadeInOutQueryAnimation } from 'src/app/app-animations';
import { WeatherStore } from '@core/store';
import { Alert } from 'src/app/models';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [fadeInOutQueryAnimation]  
})
export class AlertComponent {
  @Input()  messages: Alert[]  
  
  constructor( private store: WeatherStore ) { }

  close(alert) {    
    this.store.removeAlert(alert)    
  }
  trackByFn(index, item) {
    return index;
  }
}
