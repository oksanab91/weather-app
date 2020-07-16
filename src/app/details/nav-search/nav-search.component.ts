import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Subject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { WeatherStore } from '@core/store';
import { LocationShort } from 'src/app/models';

@Component({
  selector: 'nav-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nav-search.component.html',
  styleUrls: ['./nav-search.component.scss']
})
export class NavSearchComponent implements OnInit, OnDestroy {
  title: 'Herolo Weather Task'
  private searchName = new Subject<string>();
  private subscription: Subscription;
  locations$: Observable<LocationShort[]>
  keyword = 'name'
  

  constructor(private store: WeatherStore) { }

  ngOnInit() {
    this.locations$ = this.store.locations$ 

    this.subscription = this.searchName.pipe(      
      // wait 300ms after each keystroke before considering the filter
      debounceTime(300),

      // ignore new filter if same as previous filter
      distinctUntilChanged(),

      // switch to new search observable each time the filter changes
      switchMap((filter: string) => of(this.store.loadLocations(filter)))               
    )
    .subscribe();

  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  selectEvent(item) {
    this.store.loadDetails(item)
    this.store.loadForecast(item.id)
  }

  onChangeSearch(filter: string) {    
    this.searchName.next(filter);
  }

  onFocused(e) {
    // do something
  }


}
