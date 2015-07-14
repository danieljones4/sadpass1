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



});

