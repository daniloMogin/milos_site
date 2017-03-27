$('document').ready(function($) {
    /*----------  moving hover
    ------------------------------------------------------------------------------*/
    $(" #da-thumbs > li ").each(function() {
        $(this).hoverdir({
            hoverDelay: 75
        });
    });

    /*----------  clients
    ------------------------------------------------------------------------------*/
    var $clientcarousel = $('#clients-list');
    var clients = $clientcarousel.children().length;
    var clientwidth = (clients * 140); // 140px width for each client item 
    $clientcarousel.css('width', clientwidth);

    var rotating = true;
    var clientspeed = 4400;
    var seeclients = setInterval(rotateClients, clientspeed);

    // $(document).on({
    //     mouseenter: function () {
    //         rotating = false; // turn off rotation when hovering
    //     },
    //     mouseleave: function () {
    //         rotating = true;
    //     }
    // }, '.clients');

    function rotateClients() {
        if (rotating != false) {
            var $first = $('#clients-list li:first');
            $first.animate({ 'margin-left': '-140px' }, 1000, function() {
                $first.remove().css({ 'margin-left': '0px' });
                $('#clients-list li:last').after($first);
            });
        }
    }

    /*----------  partners
    ------------------------------------------------------------------------------*/
    var $partnercarousel = $('#partners-list');
    var partners = $partnercarousel.children().length;
    var clientwidth = (partners * 140); // 140px width for each client item 
    $partnercarousel.css('width', clientwidth);

    var rotating = true;
    var partnerspeed = 4600;
    var seepartners = setInterval(rotatePartners, partnerspeed);

    $(document).on({
        mouseenter: function() {
            rotating = false; // turn off rotation when hovering
        },
        mouseleave: function() {
            rotating = true;
        }
    }, '.partners');

    function rotatePartners() {
        if (rotating != false) {
            var $first = $('#partners-list li:first');
            $first.animate({ 'margin-left': '-140px' }, 1000, function() {
                $first.remove().css({ 'margin-left': '0px' });
                $('#partners-list li:last').after($first);
            });
        }
    }

    /*----------  stats numbers
    ------------------------------------------------------------------------------*/
    var waypoint = new Waypoint({
        element: document.getElementById("waypoint-counter"),
        handler: function() {
            $(".timer").countTo({
                speed: 1000 * 8
            });
        },
        offset: "-5%"
    });
    var waypoint = new Waypoint({
        element: document.getElementById("waypoint-counter"),
        handler: function() {
            $(".timer").countTo({
                speed: 1000 * 8
            });
        },
        offset: "97%"
    });

    $(document).on("scroll", onScroll);

    /*----------  fixed nav
    ------------------------------------------------------------------------------*/
    var nav = $(".main-nav");
    var pos = nav.offset().top;
    $(window).scroll(function() {
        var fix = ($(this).scrollTop() > pos) ? true : false;
        nav.toggleClass("fix-nav", fix);
    });
    /*----------  end of fixed nav  ----------*/

    /*----------  Back to top
    ------------------------------------------------------------------------------*/
    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 550,
        //duration of the top scrolling animation (in ms)
        scroll_top_duration = 1000,
        //grab the "back to top" link
        $back_to_top = $(".tp-container");

    $(window).scroll(function(event) {
        var scroll = $(window).scrollTop();
        if (scroll > offset) {
            $(".menu-btn").removeClass("show-none");
            $(".menu-btn").addClass("show-all");

            $(".main-nav").addClass("show-none");
            $(".main-nav").removeClass("show-all");

            $back_to_top.addClass("tp-show");
        } else {
            $(".menu-btn").addClass("show-none");
            $(".menu-btn").removeClass("show-all");

            $(".main-nav").removeClass("show-none");
            $(".main-nav").addClass("show-all");

            $back_to_top.removeClass("tp-show");
        }
    });

    $(document).on("scroll", onScroll);

    //smooth scroll to top
    $back_to_top.on("click", function(event) {
        event.preventDefault();
        $("body,html").animate({
            scrollTop: 0,
        }, scroll_top_duration);
    });
    /*----------  end of back to top  ----------*/

    // burger menu
    //     $(".menu-btn>img").on('click', function () {
    //         for(var i = 0; i < $(".menu-btn>img").length; i++) {
    //             console.log($(".menu-btn>img").length);
    //             if($('.menu-btn>img').eq(i).hasClass('show-none')) {
    //                 $('.menu-btn>img').eq(i).removeClass('show-none');
    //                 $('.menu-btn>img').eq(i).addClass('show-all');

    //                 $('.mobile-nav>ul').addClass('show-all');
    //                 $('.mobile-nav>ul').removeClass('show-none');
    //             } else {
    //                 $('.menu-btn>img').eq(i).addClass('show-none');
    //                 $('.menu-btn>img').eq(i).removeClass('show-all');

    //                 $('.mobile-nav>ul').addClass('show-none');
    //                 $('.mobile-nav>ul').removeClass('show-all');
    //             }
    //         }
    //     });

});

/*----------  add class to menu bar links on scroll
------------------------------------------------------------------------------*/
function onScroll(event) {
    var scrollPos = $(document).scrollTop() + 80;
    $("ul.nav-script li a.ancor").each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $("ul.nav-script li a.ancor").removeClass("active");
            currLink.addClass("active");
        } else {
            currLink.removeClass("active");
        }
    });
}

/*----------  scroll to position
------------------------------------------------------------------------------*/
$("ul.nav-script li a, .mobile-nav>ul>li>a").on("click", function() {
        var scrollAnchor = $(this).attr("data-scroll"),
            scrollPoint = $('section[data-anchor="' + scrollAnchor + '"]').offset().top - 77;
        $("body,html").animate({
            scrollTop: scrollPoint
        }, 1000);

        return false;
    })
    /*----------  end of scrol to position  ----------*/

/*----------  reload page
    ------------------------------------------------------------------------------*/
$("#reload").click(function() {
    location.reload();
});