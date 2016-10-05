$(function(){
    $('#calc-outer').css('width', $('#calc-outer').height() / 2);
    $(window).resize(function() {
        var h = $('#calc-outer').height();
        $('#calc-outer').width( h / 2);
        
        var w = $('#calc-outer').width();
        var brString = h/10 + '% ' + h/10 + '% ' + w/10 + '% ' + w/10 + '% / 4% 4% 17% 17%';
        $('#calc-outer').css({'border-radius': brString});
        /*$('calc-outer').attr('style', 'border-radius: 53.75% 4% 53.75% 4% / 26.875% 17% 26.875% 50%;');*/
    });
});