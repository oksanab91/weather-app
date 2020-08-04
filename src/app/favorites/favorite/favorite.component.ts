import { Component, Input } from '@angular/core';
import { LocationDetails } from '@models/models';

@Component({
  selector: 'favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent {
  @Input()  favorite: LocationDetails;

  constructor() { }
}
