import { fadeInAnimation, fadeInOutAnimation, fadeInOutQueryAnimation } from './fadeInOut.animation';
import { slideListInOutAnimation } from './slideListInOut.animation';

export const animations = [
    fadeInAnimation,
    fadeInOutAnimation,    
    fadeInOutQueryAnimation,
    slideListInOutAnimation
];

export * from './fadeInOut.animation';
export * from './slideListInOut.animation';