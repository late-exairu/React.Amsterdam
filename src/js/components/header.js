const burger = $('.js-burger');
const menu = $('.js-menu');
const content = $('.js-main');
const scrollLink = $('.js-scroll-link');
const wind = $(window);

burger.on('click', function() {
  $(this).toggleClass('is-active');
  menu.toggleClass('is-open');
  content.toggleClass('blur');
});


scrollLink.on('click', function(e) {
  burger.removeClass('is-active');
  menu.removeClass('is-open');
  content.removeClass('blur');
  $('html, body').stop().animate({
    scrollTop: $($(this).attr('href')).offset().top
  }, 600);
});

wind.resize(() => {
  if (menu.hasClass('is-open') && wind.width() > 1023) {
    burger.removeClass('is-active');
    menu.removeClass('is-open');
    content.removeClass('blur');
  }
});
