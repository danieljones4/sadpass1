jQuery(document).ready(function() {
    if (!("ontouchstart" in document.documentElement)) {
        document.documentElement.className += "noTouch";
    } 
//jQuery is required to run this code

    scaleVideoContainer();

    initBannerVideoSize('.video-container .poster img');
    initBannerVideoSize('.video-container .filter');
    initBannerVideoSize('.video-container video');


    if ($('html').hasClass('noTouch')) {
        $(window).on('resize', function() {
            scaleVideoContainer();
            scaleBannerVideoSize('.video-container .poster img');
            scaleBannerVideoSize('.video-container .filter');
            scaleBannerVideoSize('.video-container video');
        });
    }
    

function scaleVideoContainer() {

    var height = $(window).height() + 5;
    var unitHeight = parseInt(height) + 'px';
    $('.homepage-hero-module').css('height',unitHeight);

}

function initBannerVideoSize(element){

    $(element).each(function(){
        $(this).data('height', $(this).height());
        $(this).data('width', $(this).width());
    });

    scaleBannerVideoSize(element);

}

function scaleBannerVideoSize(element){

    var windowWidth = $(window).width(),
    windowHeight = $(window).height() + 5,
    videoWidth,
    videoHeight;

    console.log(windowHeight);

    $(element).each(function(){
        var videoAspectRatio = $(this).data('height')/$(this).data('width');

        $(this).width(windowWidth);

        if(windowWidth < 1000){
            videoHeight = windowHeight;
            videoWidth = videoHeight / videoAspectRatio;
            $(this).css({'margin-top' : 0, 'margin-left' : -(videoWidth - windowWidth) / 2 + 'px'});

            $(this).width(videoWidth).height(videoHeight);
        }

        $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

    });

};

    jQuery(".foreground").wrapInner('<div class="fginner"></div>');
    jQuery(".fginner").wrapInner('<div class="boxtxt"></div>');  
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
    //var scrollPos = $('body > .container').find($(this).attr('href')).offset().top - (offsetHeight - 1);

});

