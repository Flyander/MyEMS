(function($) {
    function handlePreloader() {
        if ($('.preloader').length) {
            $('body').addClass('page-loaded');
            $('.preloader').delay(1000).fadeOut(300);
        }
    }
    $(window).on('load', function() {
        handlePreloader();
    });
})(window.jQuery);

jQuery(function($) {
    // Dropdown menu
    $('.sidebar-dropdown > a').click(function() {
        $('.sidebar-submenu').slideUp(200);
        if ($(this).parent().hasClass('active')) {
            $('.sidebar-dropdown').removeClass('active');
            $(this).parent().removeClass('active');
        } else {
            $('.sidebar-dropdown').removeClass('active');
            $(this).next('.sidebar-submenu').slideDown(200);
            $(this).parent().addClass('active');
        }
    });

    //toggle sidebar
    $('#toggle-sidebar').click(function() {
        $('.page-wrapper').toggleClass('toggled');
    });

    // bind hover if pinned is initially enabled
    if ($('.page-wrapper').hasClass('pinned')) {
        $('#sidebar').hover(
            function() {
                console.log('mouseenter');
                $('.page-wrapper').addClass('sidebar-hovered');
            },
            function() {
                console.log('mouseout');
                $('.page-wrapper').removeClass('sidebar-hovered');
            }
        );
    }

    //Pin sidebar
    $('#pin-sidebar').click(function() {
        if ($('.page-wrapper').hasClass('pinned')) {
            // unpin sidebar when hovered
            $('.page-wrapper').removeClass('pinned');
            $('#sidebar').unbind('hover');
        } else {
            $('.page-wrapper').addClass('pinned');
            $('#sidebar').hover(
                function() {
                    console.log('mouseenter');
                    $('.page-wrapper').addClass('sidebar-hovered');
                },
                function() {
                    console.log('mouseout');
                    $('.page-wrapper').removeClass('sidebar-hovered');
                }
            );
        }
    });

    //toggle sidebar overlay
    $('#overlay').click(function() {
        $('.page-wrapper').toggleClass('toggled');
    });

    //switch between themes
    var themes =
        'default-theme legacy-theme chiller-theme ice-theme cool-theme light-theme';
    $('[data-theme]').click(function() {
        $('[data-theme]').removeClass('selected');
        $(this).addClass('selected');
        $('.page-wrapper').removeClass(themes);
        $('.page-wrapper').addClass($(this).attr('data-theme'));
    });

    // toggle border radius
    $('#toggle-border-radius').change(function(e) {
        e.preventDefault();
        $('.page-wrapper').toggleClass('boder-radius-on');
    });

    //custom scroll bar is only used on desktop
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )) {
        $('.sidebar-content').mCustomScrollbar({
            axis: 'y',
            autoHideScrollbar: true,
            scrollInertia: 300,
        });
        $('.sidebar-content').addClass('desktop');
    }
});