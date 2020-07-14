import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherDetails } from '@models/models';
import { Observable } from 'rxjs';
import { WeatherStore } from '@core/store';
import { fadeInAnimation } from 'src/app/app-animations';

@Component({
  selector: 'weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class WeatherDetailsComponent implements OnInit {  
  locationId = 215854
  details$: Observable<WeatherDetails>  

  constructor(private route: ActivatedRoute, private store: WeatherStore) {
    const Id = + this.route.snapshot.paramMap.get('id');    
    this.locationId = Id ? Id : this.locationId
    console.log(this.locationId)

    this.store.loadDetails(this.locationId)    
  }

  ngOnInit(): void {
    this.details$ = this.store.details$    
  }

}
