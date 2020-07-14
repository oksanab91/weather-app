import { Component, OnInit, Input } from '@angular/core';
import { Favorite } from '@models/models';
import { AlertService } from '@core/service';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  @Input()  favorite: Favorite;

  constructor(private alertService: AlertService) {
    this.alertService.reset();
  }

  ngOnInit() {
  }

  // hasMapUrl(): boolean {
  //   return this.favorite.googleMapUrl !== '';
  // }
}
