window.addEventListener('load', function() {
	document.getElementById("menu-button").addEventListener("click", showMenu);
	document.getElementById("exit").addEventListener("click", hideMenu);
	$('.single-item').slick({
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		autoplay: true
	});
	// $('.organizer-block.random').shuffle();
});

function showMenu() {
	document.getElementById("mobile-menu").style.marginTop = "0";
	document.getElementById("menu-button").style.marginTop = "700px";
	document.getElementById("logo-green").style.display = "block";
}

function hideMenu() {
	document.getElementById("mobile-menu").style.marginTop = "-710px";
	document.getElementById("menu-button").style.marginTop = "0";
	document.getElementById("logo-green").style.display = "none";
}

function showSpeakers(e) {
	e.preventDefault();
	var speakers = document.getElementsByClassName("hidden-speaker");
	if (document.getElementById("btn-bold").innerHTML == "All") {
		document.getElementById("btn-bold").innerHTML = "Hide";
		for  (i = 0; i < speakers.length; i++) {
			speakers[i].style.display = "inline-block";
		}
	} else {
		for  (i = 0; i < speakers.length; i++) {
			speakers[i].style.display = "none";
		}
		document.getElementById("btn-bold").innerHTML = "All"
	}
}

(function($){
	$.fn.shuffle = function() {
		var allElems = this.get(),
			getRandom = function(max) {
				return Math.floor(Math.random() * max);
			},
			shuffled = $.map(allElems, function(){
				var random = getRandom(allElems.length),
					randEl = $(allElems[random]).clone(true)[0];
				allElems.splice(random, 1);
				return randEl;
			});
		this.each(function(i){
			$(this).replaceWith($(shuffled[i]));
		});
		return $(shuffled);
	};
})(jQuery);
