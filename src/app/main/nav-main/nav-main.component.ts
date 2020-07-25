import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@core/service';

@Component({
  selector: 'nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.scss']
})
export class NavMainComponent implements OnInit { 
    header = 'Weather'
    toggleOn = false

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  toggleTheme() {
    this.toggleOn = !this.toggleOn

    if (this.toggleOn) this.themeService.setDarkTheme()      
    else this.themeService.setLightTheme()    
  }

  setToggleIcon() {
    if(this.toggleOn) return 'fas fa-toggle-on'
    else return 'fas fa-toggle-off'
  }

}
