$(function() {

	// Burger menu

	$('.menu-toggle').click(function(){
		$(this).toggleClass('open');
		$(this).siblings('.main-nav').toggleClass('open');
		$(this).closest('.wrapper').find('.content').toggleClass('fade');
	});

	// Anchor navigation

	$('a[href*="#"]:not([href="#"])').click(function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      var _this = this;
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 400, function() {
          location.hash = _this.hash;
        });
        return false;
      }
    }
  });

	// Tabs

	$('.js-tabs__tab').on('click', function (e) {
		e.preventDefault();
		$('.js-tabs__tab, .js-tabs__panel').removeClass('active');
		$(this).add('#' + $(this).attr('id').replace(/\s*tab\s*/, 'panel')).addClass('active');
		$(this).focus();
	});

});
