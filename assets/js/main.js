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


function getTableDispatch()
{
    $('#tbody_dispatch').html('');
    jQuery.ajax({
        url: "getDispatch",
        type: "POST",
        dataType: 'json',
        success: function (data) {
            if (data.code == 200)
            {
                $('.icon').css({ "display": "block" });
                table = '';

                jQuery.each(data.data.onServiceName, function (i, item)
                {
                    table += '<tr>';

                    if (item.supervisor == 1)
                        table += "<td style=\"color: orange; font-size: 12px; padding-top: 15px;\"><i class=\"fas fa-crown\"></i></td>";
                    else
                        table += "<td></td>";

                    table += "<td>"+ item.fullname +"</td>";
                    table += "<td>"+ item.grade +"</td>";
                    table += "<td>"+ item.spe +"</td>";

                    if (item.isAvailable == 1)
                        table += "<td style = \"color: green;\"><i class=\"fas fa-sync-alt fa-spin\"></i> En service</td>";
                    else if (item.isAvailable == 2)
                        table += "<td style = \"color: orange;\"><i class=\"fas fa-spinner fa-pulse\"></i> En pause</td>";

                    table += '</tr>';
                });

                $('#tbody_dispatch').html(table);
                $('.icon').css({ "display": "none" });
            }
        },
        complete: function() {
            setTimeout(getTableDispatch, 20000); //After completion of request, time to redo it after a second
        }
    });
}