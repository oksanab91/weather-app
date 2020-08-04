import { Component, OnInit } from '@angular/core';
import { ThemeService } from '@core/service';

@Component({
  selector: 'nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.scss']
})
export class NavMainComponent implements OnInit {
  toggleOn = false
  menuShow = false

  constructor(private themeService: ThemeService) { }

  ngOnInit(): void {
  }

  toggleTheme() {
    this.toggleOn = !this.toggleOn
    this.themeService.switchTheme()
  }

  setToggleIcon() {
    if(this.toggleOn) return 'fas fa-toggle-on'
    else return 'fas fa-toggle-off'
  }

  setCollapseIcon() {
    if(this.menuShow) return 'fas fa-chevron-up'
    return 'fas fa-chevron-down'
  }
  collapseMenu() {
    this.menuShow = !this.menuShow
  }
  
}
