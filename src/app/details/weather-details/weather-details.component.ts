import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocationWeather, LocationShort } from '@models/models';
import { Observable } from 'rxjs';
import { WeatherStore } from '@core/store';
import { Location } from '@angular/common';
import { fadeInAnimation } from 'src/app/app-animations';

@Component({
  selector: 'weather-details',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class WeatherDetailsComponent implements OnInit {
  locationInit: LocationShort = new LocationShort()  
  defaultLocation: LocationShort = {id: '215854', name: 'Tel Aviv'}
  details$: Observable<LocationWeather>  

  constructor(private route: ActivatedRoute, private loc:Location, private store: WeatherStore) {
    const param = this.loc.getState()

    if(param && param['id']) {
      this.locationInit.id = param['id']
      this.locationInit.name = param['name']
    }
    else this.locationInit = this.defaultLocation    

    this.store.loadDetails(this.locationInit)    
  }

  ngOnInit(): void {
    this.details$ = this.store.details$    
  }

  updateFavorite(item: LocationWeather){       
    if(item.isFavorite) this.store.removeFavorite(item.locationId)
    else this.store.addFavorite({id: item.locationId, name: item.locationName})
  }  

}
