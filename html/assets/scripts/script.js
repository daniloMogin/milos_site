/*----------  equal col
------------------------------------------------------------------------------*/
equalheight = function(container){

    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function() {

        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
                rowDivs[currentDiv].height(currentTallest);
            }
            rowDivs.length = 0; // empty the array
            currentRowStart = topPostion;
            currentTallest = $el.height();
            rowDivs.push($el);
        } else {
            rowDivs.push($el);
            currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}

$(window).load(function() {
/*----------  equal height call
------------------------------------------------------------------------------*/
    equalheight('.pricing .pricing-col');
/*----------  flex slider call
------------------------------------------------------------------------------*/
    $('.flexslider').flexslider({
        animation: "slide"
    });
});


$(window).resize(function() {
/*----------  equal height call
------------------------------------------------------------------------------*/
    equalheight('.pricing .pricing-col');
});

$('document').ready(function($) {
/*----------  fixed nav
------------------------------------------------------------------------------*/
    var nav = $('.main-nav');
    var pos = nav.offset().top;
    $(window).scroll(function () {
        var fix = ($(this).scrollTop() > pos) ? true : false;
        nav.toggleClass('fix-nav', fix);
        $('body').toggleClass('fix-body', fix);
    });
/*----------  smooth scroll
------------------------------------------------------------------------------*/
    jQuery.scrollSpeed(100, 800);
/*----------  mobile nav
------------------------------------------------------------------------------*/
    $(".nav-btn").click(function () {
        $(".header .mobile-nav").toggleClass("none");
    });
    
});
