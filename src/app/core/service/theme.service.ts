import { Injectable } from '@angular/core';

export const lightTheme = {
  '--colorDark': '#b35900',
  '--colorLight': '#ffe6cc',
  '--colorDarkSecondary': '#804000',
  '--backgroundColorPrimary': '#f1f1f1',
  '--backgroundColorWidget': '#b35900',
  '--colorWidget': '#ffffff',
  '--activeColor': '#ffffff',
  '--colorPrimary': '#212529'
}

export const darkTheme = {
  '--colorDark': '#f1f1f1',
  '--colorLight': '#804000',
  '--colorDarkSecondary': '#ffffff',
  '--backgroundColorPrimary': '#b35900',
  '--backgroundColorWidget': '#804000',
  '--colorWidget': '#ffffff',
  '--activeColor': '#804000',
  '--colorPrimary': '#ffffff'
}

export const darkThemeSecondary = {
  '--colorDark': '#f1f1f1',
  '--colorLight': '#804000',
  '--colorDarkSecondary': '#ffffff',
  '--backgroundColorPrimary': '#b35900',
  '--backgroundColorWidget': '#f1f1f1',
  '--colorWidget': '#804000',
  '--activeColor': '#804000',
  '--colorPrimary': '#ffffff'
}

export const greenTheme = {
  '--colorDark': '#1f601f',
  '--ColorLight': '#b3e6b3',
  '--colorDarkSecondary': '#001a00',
  '--backgroundColorWidget': '#1f601f'
}


@Injectable({
  providedIn: 'root'
})
export class ThemeService { 
  private availableThemes = [lightTheme, darkTheme, darkThemeSecondary];

  constructor() { }

  getAvailableThemes() {
    return this.availableThemes;
  }
  
  setDarkTheme(): void {
    this.setActiveTheme(darkThemeSecondary);
  }

  setLightTheme(): void {
    this.setActiveTheme(lightTheme);
  }  

  setActiveTheme(theme): void {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(k, theme[k])
    )
  }
}
