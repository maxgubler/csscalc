$(function(){
    $('#calc-outer').css('width', $('#calc-outer').height() / 2);
    $(window).resize(function() {
        $('#calc-outer').width($('#calc-outer').height() / 2);
    });
});