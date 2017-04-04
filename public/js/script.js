$(function(){
    var evaluate, entryFocus, type;
    var inputID = '#calc-screen-text-entry';
    
    // RESIZE
    $('#calc-outer').css('width', $('#calc-outer').height() / 2);
    $(window).resize(function() {
        var h = $('#calc-outer').height();
        $('#calc-outer').width( h / 2);
    });
    
    // MATH
    evaluate = function() {
        $(inputID).val(function(index, entry){
           var result = math.eval(entry);
           return result;
        });
        entryFocus();
    };
    
    // MISC
    entryFocus = function() {
        $(inputID).focus();
    };
    
    type = function(val, id) {
        $(id).click(function(){
            var entry = $(inputID).val();
            entry += val;
            $(inputID).val(entry);
            entryFocus();
        });
    };
    
    // Test: Display input cursor position in console
    $(inputID).click(function(){
        var cPos = $(inputID)[0].selectionStart;
        console.log(cPos);
    });


    // BUTTONS
    // Enter
    $('#col-5-enter').click(function(){
        evaluate();
    });
    
    // Clear
    $('#col-5-clear').click(function(){
        $(inputID).val('');
        entryFocus();
    });
    
    // Numbers
    type('0', '#col-2-0');
    type('1', '#col-2-1');
    type('2', '#col-3-2');
    type('3', '#col-4-3');
    type('4', '#col-2-4');
    type('5', '#col-3-5');
    type('6', '#col-4-6');
    type('7', '#col-2-7');
    type('8', '#col-3-8');
    type('9', '#col-4-9');
    
    // Symbols
    type('=', '#col-1-equal');
    type('(', '#col-2-leftpar');
    type(')', '#col-3-rightpar');
    type(',', '#col-4-comma');
    type('/', '#col-5-div');
    type('*', '#col-5-mult');
    type('-', '#col-5-minus');
    type('+', '#col-5-plus');
    type('.', '#col-3-period');
    
    // KEYS
    // Enter / Return
    $(window).keypress(function (e) {
        if (e.which === 13) {
            e.preventDefault();
            evaluate();
        }
    });
});