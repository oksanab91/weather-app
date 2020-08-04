import { Injectable } from '@angular/core';
import { environment } from '@env';

export const lightTheme = {
  '--colorDark': '#b35900',
  '--colorLight': '#ffe6cc',
  '--colorDarkSecondary': '#804000',
  '--backgroundColorPrimary': '#f1f1f1',
  '--backgroundColorWidget': 'transparent',
  '--backgroundColorNavSearch': '#b35900',
  '--colorWidget': '#212529',
  '--colorWeatherMain': '#804000',
  '--colorMainMobile': '#ffffff',  
  '--activeColor': '#ffffff',
  '--colorPrimary': '#212529',
  '--boxShadow': '0 1px 10px rgba(61,72,81,0.4)',
  '--cardBorder': 'none'
}

export const darkTheme = {
  '--colorDark': '#C6BC9F',
  '--colorLight': '#80734D',
  '--colorDarkSecondary': '#E2DDCF',
  '--backgroundColorPrimary': '#001A33',
  '--backgroundColorWidget': 'transparent',
  '--backgroundColorNavSearch': '#001A33',
  '--colorWidget': '#E2DDCF',
  '--colorWeatherMain': '#ffffff',
  '--colorMainMobile': '#ffffff',
  '--activeColor': '#001A33',
  '--colorPrimary': '#ffffff',
  '--boxShadow': 'none',
  '--cardBorder': '1px solid #E2DDCF'
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
    
    if(this.activeThemeDark){
      document.documentElement.style.setProperty('--backImgUrl', 'url(/assets/images/silhouette-dark.jpg)')
    }
    else {
      document.documentElement.style.setProperty('--backImgUrl', 'url(/assets/images/mountains-light.png)')
    }
  }
}
