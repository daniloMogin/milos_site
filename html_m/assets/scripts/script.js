/*----------  equal col
------------------------------------------------------------------------------*/
equalheight = function (container) {

    var currentTallest = 0,
        currentRowStart = 0,
        rowDivs = new Array(),
        $el,
        topPosition = 0;
    $(container).each(function () {

        $el = $(this);
        $($el).height('auto')
        topPostion = $el.position().top;

        if (currentRowStart != topPostion) {
            for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
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
        for (currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
        }
    });
}

$('document').ready(function ($) {
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
    $('.nav-btn').click(function () {
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
    var $clientcarousel = $('#clients-list');
    var clients = $clientcarousel.children().length;
    var clientwidth = (clients * 140); // 140px width for each client item 
    $clientcarousel.css('width', clientwidth);

    var rotating = true;
    var clientspeed = 4400;
    var seeclients = setInterval(rotateClients, clientspeed);

    $(document).on({
        mouseenter: function () {
            rotating = false; // turn off rotation when hovering
        },
        mouseleave: function () {
            rotating = true;
        }
    }, '.clients');

    function rotateClients() {
        if (rotating != false) {
            var $first = $('#clients-list li:first');
            $first.animate({ 'margin-left': '-140px' }, 1000, function () {
                $first.remove().css({ 'margin-left': '0px' });
                $('#clients-list li:last').after($first);
            });
        }
    }
    
    /*----------  clients
    ------------------------------------------------------------------------------*/
    var $partnercarousel = $('#partners-list');
    var partners = $partnercarousel.children().length;
    var clientwidth = (partners * 140); // 140px width for each client item 
    $partnercarousel.css('width', clientwidth);

    var rotating = true;
    var partnerspeed = 6400;
    var seepartners = setInterval(rotatePartners, partnerspeed);

    $(document).on({
        mouseenter: function () {
            rotating = false; // turn off rotation when hovering
        },
        mouseleave: function () {
            rotating = true;
        }
    }, '.partners');

    function rotatePartners() {
        if (rotating != false) {
            var $first = $('#partners-list li:first');
            $first.animate({ 'margin-left': '-140px' }, 1000, function () {
                $first.remove().css({ 'margin-left': '0px' });
                $('#partners-list li:last').after($first);
            });
        }
    }


    /*----------  validate contact form
    ------------------------------------------------------------------------------*/
    jQuery.validator.addMethod('answercheck', function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value);
    }, "type the correct answer -_-");

    $(function () {
        $('#contact').validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                email: {
                    required: true,
                    email: true
                },
                message: {
                    required: true
                },
                answer: {
                    required: true,
                    answercheck: true
                }
            },
            messages: {
                name: {
                    required: "come on, you have a name don't you?",
                    minlength: "your name must consist of at least 2 characters"
                },
                email: {
                    required: "no email, no message"
                },
                message: {
                    required: "um...yea, you have to write something to send this form.",
                    minlength: "thats all? really?"
                },
                answer: {
                    required: "sorry, wrong answer!"
                }
            },
            submitHandler: function (form) {
                $(form).ajaxSubmit({
                    type: "POST",
                    data: $(form).serialize(),
                    url: "process.php",
                    success: function () {
                        $('#contact :input').attr('disabled', 'disabled');
                        $('#contact').fadeTo("slow", 0.15, function () {
                            $(this).find(':input').attr('disabled', 'disabled');
                            $(this).find('label').css('cursor', 'default');
                            $('#success').fadeIn();
                        });
                    },
                    error: function () {
                        $('#contact').fadeTo("slow", 0.15, function () {
                            $('#error').fadeIn();
                        });
                    }
                });
            }
        });
    });

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
                duration: 3000 * 2,
                step: function (now, fx) {
                    $(el).text(Math.ceil(now));
                },
                complete: function () {
                    if (el.dataset.sym !== undefined) {
                        el.textContent = el.textContent.concat(el.dataset.sym)
                    }
                }
            });
        });
    };

    var reset = function reset() {
        console.log($(this).scrollTop())
        if ($(this).scrollTop() > 83) {
            $(this).off("scroll");
            fx()
        }
    };

    $(window).on("scroll", reset);
});

/*----------  link to tags
------------------------------------------------------------------------------*/
$("ul.menubar>li>a").click(function (event) {
    event.preventDefault();
    //calculate destination place
    var dest = 0;
    if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
        dest = $(document).height() - $(window).height();
    } else {
        dest = $(this.hash).offset().top - 83 + "px";
    }
    //go to destination
    $('html,body').animate({ scrollTop: dest }, 1000, 'swing');
});

/*----------  add class to menu bar links
------------------------------------------------------------------------------*/
$("ul.menubar>li").click(function (event) {
    event.preventDefault();

    if ($(this).hasClass("is-selected")) {
        $(this).removeClass("is-selected");
    } else {
        $(this).addClass("is-selected");
        $(this).siblings().removeClass('is-selected');
    }
});

