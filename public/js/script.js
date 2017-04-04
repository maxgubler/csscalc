$(function(){
    var evaluate, entryFocus;
    
    // RESIZE
    $('#calc-outer').css('width', $('#calc-outer').height() / 2);
    $(window).resize(function() {
        var h = $('#calc-outer').height();
        $('#calc-outer').width( h / 2);
    });
    
    // MATH
    evaluate = function() {
        $('#calc-screen-text-entry').val(function(index, entry){
           var result = math.eval(entry);
           return result;
        });
        entryFocus();
    };
    
    // MISC
    entryFocus = function() {
        $('#calc-screen-text-entry').focus();
    };


    // BUTTONS
    // Enter
    $('#col-5-enter').click(function(){
        evaluate();
    });
    // Clear
    $('#col-5-clear').click(function(){
        $('#calc-screen-text-entry').val('');
        entryFocus();
    });
    
    // KEYS
    // Enter / Return
    $(window).keypress(function (e) {
        if (e.which === 13) {
            e.preventDefault();
            evaluate();
        }
    });
});