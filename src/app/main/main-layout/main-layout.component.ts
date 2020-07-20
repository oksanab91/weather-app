import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Alert } from 'src/app/models';
import { WeatherStore } from '@core/store';

@Component({
  selector: 'main-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  messages$: Observable<Alert[]>

  constructor(private store: WeatherStore) { }

  ngOnInit(): void {
    this.messages$ = this.store.messages$
  }

}
