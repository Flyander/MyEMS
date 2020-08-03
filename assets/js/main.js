(function($) {
    function handlePreloader() {
        if($('.preloader').length){
            $('body').addClass('page-loaded');
            $('.preloader').delay(1000).fadeOut(300);
        }
    }
    $(window).on('load', function() {
        handlePreloader();
    });	
})(window.jQuery);