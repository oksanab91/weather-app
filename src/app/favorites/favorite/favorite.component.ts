import { Component, OnInit, Input } from '@angular/core';
import { Favorite } from '@models/models';
import { HelperService } from '@core/service';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  @Input()  favorite: Favorite;

  constructor(private helper: HelperService) { }

  ngOnInit() {
  }

  setWeatherIcon(iconNumber, temperature) {    
    return this.helper.setWeatherIcon(iconNumber, temperature)
  }
  
  // hasMapUrl(): boolean {
  //   return this.favorite.googleMapUrl !== '';
  // }
}
