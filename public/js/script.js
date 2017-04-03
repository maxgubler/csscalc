$(function(){
    // RESIZE
    $('#calc-outer').css('width', $('#calc-outer').height() / 2);
    $(window).resize(function() {
        var h = $('#calc-outer').height();
        $('#calc-outer').width( h / 2);
    });
    
    // MATH
    $('#col-5-enter').click(function(){
        $('#calc-screen-text-entry').val(function(index, entry){
           var result = math.eval(entry);
           return result;
        });
    });
});