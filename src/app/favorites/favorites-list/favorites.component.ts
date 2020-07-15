import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Favorite } from '@models/models';
import { fadeInAnimation } from 'src/app/app-animations';
import { Observable } from 'rxjs';
import { WeatherStore } from '@core/store';



@Component({
  selector: 'favorites',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],  
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class FavoritesComponent implements OnInit{
  favorites$: Observable<Favorite[]> 

  constructor(private store: WeatherStore) {
    this.store.loadFavorites()
  }  

  ngOnInit() {    
    this.favorites$ = this.store.favorites$ 
  }

  trackByFn(index, item) {
    return item.id
  }
  
}