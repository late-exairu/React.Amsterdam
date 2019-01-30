import Swiper from 'swiper';
export default function slider() {
  const slider = new Swiper('.js-slider', {
    speed: 600,
    spaceBetween: 0,
    navigation: {
      nextEl: '.js-slider-next',
      prevEl: '.js-slider-prev',
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });
}
