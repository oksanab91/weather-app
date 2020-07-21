import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Favorite } from '@models/models';
import { Observable } from 'rxjs';
import { WeatherStore } from '@core/store';
import { slideListInOutAnimation } from 'src/app/app-animations/slideListInOut.animation';



@Component({
  selector: 'favorites',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],  
  animations: [slideListInOutAnimation]
})
export class FavoritesComponent implements OnInit{
  favorites$: Observable<Favorite[]> 

  constructor(private store: WeatherStore) {
    this.store.loadFavorites()
    this.store.resetAlerts()
  }  

  ngOnInit() {    
    this.favorites$ = this.store.favorites$ 
  }

  trackByFn(index, item) {
    return item.id
  }
  
}