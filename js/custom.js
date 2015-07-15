jQuery(document).ready(function() {
	jQuery(".foreground").wrapInner('<div class="fginner"></div>');
	jQuery(".fginner").wrapInner('<div class="boxtxt"></div>');
	if (!("ontouchstart" in document.documentElement)) {
		document.documentElement.className += "noTouch";
	}	
	if (!$('html').hasClass('noTouch')){
		if (!$(".boxes").hasClass("toggle")){
			$(".boxes").click(function(){
				$(".boxes, .row, .Background, .foreground").not(this).removeClass("toggle");
	    		$(this).toggleClass("toggle");
			});
		}
	}
	$('body').scrollspy({
   		offset: 51
	});
	var scrollPos = $('body > .container').find($(this).attr('href')).offset().top - (offsetHeight - 1);


});

