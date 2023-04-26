$(function(){
    $('#board .alarm .slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $('#board .alarm .count').html('<em>' + i + '</em> / ' + slick.slideCount);
    });

    $('#board .alarm .slick').slick({
        autoplay: true,
        arrows: true,
        dots: false,
        prevArrow: $('#board .alarm .prev'),
        nextArrow: $('#board .alarm .next'),
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        zIndex: 1000,
        pauseOnHover: false,
        autoplaySpeed: 4000,
        speed: 1500
    });
    $('#board .alarm .control button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#board .alarm .play').show();
            $('#board .alarm .slick').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#board .alarm .pause').show();
            $('#board .alarm .slick').slick('slickPlay');
        }
    });
});   
    


 