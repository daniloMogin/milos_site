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
        animation: "slide",
        slideshow: false
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
//    jQuery.scrollSpeed(150, 900);
    
/*----------  mobile nav
------------------------------------------------------------------------------*/
    $('.nav-btn').click(function(){
        if ($('.mobile-nav').hasClass('none')) {
            $('.mobile-nav').height($('.mobile-nav').find('.header .mobile-nav').height());
            $('.mobile-nav').removeClass('none');
        } else {
            $('.mobile-nav').height(''); 
            $('.mobile-nav').addClass('none');
        }
    });

/*----------  clients
------------------------------------------------------------------------------*/
    $("#lista1").als({
        visible_items: 4,
        scrolling_items: 2,
        orientation: "horizontal",
        circular: "yes",
        autoscroll: "no",
        interval: 5000,
        speed: 500,
        easing: "linear",
        direction: "right",
        start_from: 0
    });

    //logo hover
    $("#logo_img").hover(function()
                         {
        $(this).attr("src","images/als_logo_hover212x110.png");
    },function()
                         {
        $(this).attr("src","images/als_logo212x110.png");
    });

    //logo click
    $("#logo_img").click(function()
                         {
        location.href = "http://als.musings.it/index.php";
    });

    $("a[href^='http://']").attr("target","_blank");
    $("a[href^='http://als']").attr("target","_self");
    
    
    
    
    
    
});

/*----------  stats numbers
------------------------------------------------------------------------------*/
$(function () {
    var fx = function fx() {
        $(".stat-number").each(function (i, el) {
            var data = parseInt(this.dataset.n, 10);
            var props = {
                "from": {
                    "count": 0
                },
                "to": {
                    "count": data
                }
            };
            $(props.from).animate(props.to, {
                duration: 1000 * 1,
                step: function (now, fx) {
                    $(el).text(Math.ceil(now));
                },
                complete:function() {
                    if (el.dataset.sym !== undefined) {
                        el.textContent = el.textContent.concat(el.dataset.sym)
                    }
                }
            });
        });
    };

    var reset = function reset() {
        console.log($(this).scrollTop())
        if ($(this).scrollTop() > 120) {
            $(this).off("scroll");
            fx()
        }
    };

    $(window).on("scroll", reset);
});