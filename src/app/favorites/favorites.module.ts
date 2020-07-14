import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { FavoritesComponent } from './favorites-list/favorites.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { WeatherStore } from '@core/store';


@NgModule({
    declarations: [
      FavoritesComponent, FavoriteComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      SharedModule,               
      RouterModule.forChild([{ path: '', component: FavoritesComponent}])       
    ],
    providers: [WeatherStore]    
  })
  export class FavoritesModule { }