$(document).ready(function() {
    var width = $('.justified').width();
    $('.justified').css('margin-left', '-' + (width / 2) + 'px');

    $(".nav a").on("click", function() {
        $(".nav").find(".active").removeClass("active");
        $(this).parent().addClass("active");
    });
});