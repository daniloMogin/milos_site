$(function() {
        /*----------  moving hover
        ------------------------------------------------------------------------------*/
        $(' #da-thumbs > li ').each(function() {
            $(this).hoverdir({
                hoverDelay: 75
            })
        })

        /*----------  animate content in viewport
        ------------------------------------------------------------------------------*/
        var $animation_elements = $(".animation-element, .timer");
        var $window = $(window);

        function check_if_in_view() {
            var window_height = $window.height();
            var window_top_position = $window.scrollTop();
            var window_bottom_position = (window_top_position + window_height);

            $.each($animation_elements, function() {
                var $element = $(this);
                var element_height = $element.outerHeight();
                var element_top_position = $element.offset().top;
                var element_bottom_position = (element_top_position + element_height);

                //check to see if this current container is within viewport
                if ((element_bottom_position >= window_top_position) &&
                    (element_top_position <= window_bottom_position)) {
                    $element.addClass("in-view");
                } else {
                    $element.removeClass("in-view");
                }
            });
        }

        $window.on("scroll resize", check_if_in_view);
        $window.trigger("scroll");
        /*----------  end of animate content in viewport  ----------*/

        /*----------  clients
        ------------------------------------------------------------------------------*/
        var $clientcarousel = $('#clients-list')
        var clients = $clientcarousel.children().length
        var clientwidth = (clients * 140) // 140px width for each client item 
        $clientcarousel.css('width', clientwidth)

        var rotating = true
        var clientspeed = 4400
        var seeclients = setInterval(rotateClients, clientspeed)

        // $(document).on({
        //     mouseenter: function () {
        //         rotating = false // turn off rotation when hovering
        //     },
        //     mouseleave: function () {
        //         rotating = true
        //     }
        // }, '.clients')

        function rotateClients() {
            if (rotating != false) {
                var $first = $('#clients-list li:first')
                $first.animate({ 'margin-left': '-140px' }, 1000, function() {
                    $first.remove().css({ 'margin-left': '0px' })
                    $('#clients-list li:last').after($first)
                })
            }
        }

        /*----------  partners
        ------------------------------------------------------------------------------*/
        var $partnercarousel = $('#partners-list')
        var partners = $partnercarousel.children().length
        var clientwidth = (partners * 140) // 140px width for each client item 
        $partnercarousel.css('width', clientwidth)

        var rotating = true
        var partnerspeed = 4600
        var seepartners = setInterval(rotatePartners, partnerspeed)

        $(document).on({
            mouseenter: function() {
                rotating = false // turn off rotation when hovering
            },
            mouseleave: function() {
                rotating = true
            }
        }, '.partners')

        function rotatePartners() {
            if (rotating != false) {
                var $first = $('#partners-list li:first')
                $first.animate({ 'margin-left': '-140px' }, 1000, function() {
                    $first.remove().css({ 'margin-left': '0px' })
                    $('#partners-list li:last').after($first)
                })
            }
        }

        /*----------  stats numbers
        ------------------------------------------------------------------------------*/
        var waypoint = new Waypoint({
            element: document.getElementById('waypoint-counter'),
            handler: function() {
                $('.timer').countTo({
                    speed: 1000 * 8
                })
            },
            offset: '-5%'
        })
        var waypoint = new Waypoint({
            element: document.getElementById('waypoint-counter'),
            handler: function() {
                $('.timer').countTo({
                    speed: 1000 * 8
                })
            },
            offset: '97%'
        })

        /*----------  fixed nav
        ------------------------------------------------------------------------------*/
        var nav = $('.main-nav')
        var pos = nav.offset().top
        $(window).scroll(function() {
            var fix = ($(this).scrollTop() > pos) ? true : false
            nav.toggleClass('fix-nav', fix)
        })
        var navM = $('.mobile-nav')
        var menuBtn = $('.nav-btn')
        if ($('.mobile-wrap').width() < 639) {
            // console.log(`asd`)
            // console.log(navM)
            navM.removeClass('show')
        }
        menuBtn.on('click', function() {
            /*----------  mobile nav  && $("#nav-btn").hasClass("fa-bars")
            ------------------------------------------------------------------------------*/
            if ($('.mobile-nav').hasClass('show-mobile-nav')) {
                navM.addClass('hide-mobile-nav')
                navM.removeClass('show-mobile-nav')
            } else {
                navM.addClass('show-mobile-nav')
                navM.removeClass('hide-mobile-nav')
            }
            /*----------  end of mobile nav  ----------*/
        })

        /*----------  end of fixed nav  ----------*/

        /*----------  Back to top
        ------------------------------------------------------------------------------*/
        // browser window scroll (in pixels) after which the 'back to top' link is shown
        var offset = 550,
            //duration of the top scrolling animation (in ms)
            scroll_top_duration = 1000,
            //grab the 'back to top' link
            $back_to_top = $('.tp-container')

        $(window).scroll(function(event) {
            var scroll = $(window).scrollTop()
            if (scroll > offset) {
                $('.menu-btn').removeClass('show-none')
                $('.menu-btn').addClass('show-all')

                $('.main-nav').addClass('show-none')
                $('.main-nav').removeClass('show-all')

                $back_to_top.addClass('tp-show')
            } else {
                $('.menu-btn').addClass('show-none')
                $('.menu-btn').removeClass('show-all')

                $('.main-nav').removeClass('show-none')
                $('.main-nav').addClass('show-all')

                $back_to_top.removeClass('tp-show')
            }
        })

        $(document).on('scroll', onScroll)

        //smooth scroll to top
        $back_to_top.on('click', function(event) {
                event.preventDefault()
                $('body,html').animate({
                    scrollTop: 0,
                }, scroll_top_duration)
            })
            /*----------  end of back to top  ----------*/

        // burger menu
        //     $('.menu-btn>img').on('click', function () {
        //         for(var i = 0 i < $('.menu-btn>img').length i++) {
        //             console.log($('.menu-btn>img').length)
        //             if($('.menu-btn>img').eq(i).hasClass('show-none')) {
        //                 $('.menu-btn>img').eq(i).removeClass('show-none')
        //                 $('.menu-btn>img').eq(i).addClass('show-all')

        //                 $('.mobile-nav>ul').addClass('show-all')
        //                 $('.mobile-nav>ul').removeClass('show-none')
        //             } else {
        //                 $('.menu-btn>img').eq(i).addClass('show-none')
        //                 $('.menu-btn>img').eq(i).removeClass('show-all')

        //                 $('.mobile-nav>ul').addClass('show-none')
        //                 $('.mobile-nav>ul').removeClass('show-all')
        //             }
        //         }
        //     })

    })
    // end of $( document ).ready() block.

/*----------  add class to menu bar links on scroll
------------------------------------------------------------------------------*/
function onScroll(event) {
    if ($('.mobile-wrap').width() < 639) {
        // console.log('asd')
        var scrollPos = $(document).scrollTop() - 90
    } else {
        // console.log('qwe')
        var scrollPos = $(document).scrollTop() + 70
    }
    $('ul.nav-script li a.ancor').each(function() {
        var currLink = $(this)
        var refElement = $(currLink.attr('href'))
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('ul.nav-script li a.ancor').removeClass('active')
            currLink.addClass('active')
        } else {
            currLink.removeClass('active')
        }
    })
}

/*----------  scroll to position
------------------------------------------------------------------------------*/
$('ul.nav-script li a, .mobile-nav>ul>li>a').on('click', function() {
        var scrollAnchor = $(this).attr('data-scroll')

        if ($('.mobile-wrap').width() < 639) {
            console.log('asd')
            var scrollPoint = $('section[data-anchor=' + scrollAnchor + ']').offset().top
        } else {
            console.log('qwe')
            var scrollPoint = $('section[data-anchor=' + scrollAnchor + ']').offset().top - 67
        }
        $('body,html').animate({
            scrollTop: scrollPoint
        }, 1000)

        return false
    })
    /*----------  end of scrol to position  ----------*/

/*----------  reload page
    ------------------------------------------------------------------------------*/
$('#reload').click(function() {
    location.reload()
})