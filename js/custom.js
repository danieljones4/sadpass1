jQuery(document).ready(function() {
	jQuery(".foreground").wrapInner('<div class="fginner"></div>');
	jQuery(".fginner").wrapInner('<div class="boxtxt"></div>');
	if (!("ontouchstart" in document.documentElement)) {
		document.documentElement.className += "noTouch";
	}	
	if (!$('html').hasClass('no-touch')){

	}
	else {
		$(".boxes").click(function(){
    		$(".boxes, .Background, .foreground").toggleClass("toggle");
		});
	}

});

