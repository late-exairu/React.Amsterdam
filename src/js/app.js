import sayHello from './lib/sayHello.js';
import './components/tabs';
import './components/header';
import svg4everybody from 'svg4everybody';
import msieversion from './components/detectIE';
import slider from './components/_slider';
import noTouch from './components/noTouch';

sayHello();
noTouch();
$(window).resize(function() {
  $('body').css('--vh', `${window.innerHeight * 0.01}px`);
});

function touch() {
  return 'ontouchstart' in window;
}

// detect
if (!touch()) {
  $('body').addClass('no-touch');
}
svg4everybody();


// detect IE
let isIE = msieversion();
if (isIE !== 'otherbrowser') {
  $('body').addClass('is-ie');
}

if ($('.js-slider')) {
  slider();
}
