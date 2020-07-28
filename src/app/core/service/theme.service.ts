import { Injectable } from '@angular/core';
import { environment } from '@env';

export const lightTheme = {
  '--colorDark': '#b35900',
  '--colorLight': '#ffe6cc',
  '--colorDarkSecondary': '#804000',
  '--backgroundColorPrimary': '#f1f1f1',
  '--backgroundColorWidget': '#b35900',
  '--backgroundColorNavSearch': '#b35900',
  '--colorWidget': '#ffffff',
  '--activeColor': '#ffffff',
  '--colorPrimary': '#212529'
}

export const darkTheme = {
  '--colorDark': '#C6BC9F',
  '--colorLight': '#80734D',
  '--colorDarkSecondary': '#ffffff',
  '--backgroundColorPrimary': '#001A33',
  '--backgroundColorWidget': '#CCCCFF',
  '--backgroundColorNavSearch': '#001A33',
  '--colorWidget': '#212529',
  '--activeColor': '#001A33',
  '--colorPrimary': '#ffffff'
}


@Injectable({
  providedIn: 'root'
})
export class ThemeService { 
  private availableThemes = [lightTheme, darkTheme];
  private activeThemeDark = environment.theme === 'darkTheme'

  constructor() { }

  getAvailableThemes() {
    return this.availableThemes;
  }
  
  switchTheme(): void {
    this.activeThemeDark = !this.activeThemeDark
    if(this.activeThemeDark) this.setActiveTheme(darkTheme)
    else this.setActiveTheme(lightTheme)
  }

  setActiveTheme(theme): void {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(k, theme[k])
    )
  }
}
