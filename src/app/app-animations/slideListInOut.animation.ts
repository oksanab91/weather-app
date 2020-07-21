import { trigger, animate, transition, style, query, stagger, keyframes } from '@angular/animations';

      
export const slideListInOutAnimation =
    trigger('slideListInOutAnimation', [
        transition('* => *', [
  
          query(':enter', style({ opacity: 0 }), {optional: true}),
  
          query(':enter', stagger('250ms', [
            animate('1s ease-in', keyframes([
              style({opacity: 0, transform: 'translateX(-75%)', offset: 0}),
              style({opacity: .5, transform: 'translateX(35px)',  offset: 0.3}),
              style({opacity: 1, transform: 'translateX(0)',     offset: 1.0}),
            ]))]), {optional: true})
        ])
      ])
