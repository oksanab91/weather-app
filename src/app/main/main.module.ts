import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavMainComponent } from './nav-main/nav-main.component';


@NgModule({
  declarations: [MainLayoutComponent, NavMainComponent],
  imports: [    
    SharedModule,
    RouterModule.forChild([
      { 
        path: '', component: MainLayoutComponent,
        children: [          
          { path: '', 
            loadChildren: () => import('../details/weather-details.module').then(m => m.WeatherDetailsModule) },
          { path: 'favorites', 
            loadChildren: () => import('../favorites/favorites.module').then(m => m.FavoritesModule) },
          { path: 'details', data :{ id:'1', name:"Angular" },
            loadChildren: () => import('../details/weather-details.module').then(m => m.WeatherDetailsModule) }          
        ]}     
    ])
  ]
})
export class MainModule { }
