import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-main',
  templateUrl: './nav-main.component.html',
  styleUrls: ['./nav-main.component.scss']
})
export class NavMainComponent implements OnInit {
  title = 'Herolo Weather Task'
    
  constructor() { }

  ngOnInit(): void {
  }

}
