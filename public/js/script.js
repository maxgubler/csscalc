$(function(){
    // Decalare functions
    var evaluate, entryFocus, insert, buttonPress;
    
    // Set shorthand variable for selectors
    var inputID = '#calc-screen-text-entry';
    
    // RESIZE
    $('#calc-outer').css('width', $('#calc-outer').height() / 2);
    $(window).resize(function() {
        var h = $('#calc-outer').height();
        $('#calc-outer').width(h / 2);
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
    entryFocus = function(cPos) {
        // cPos is the desired cursor position
        // if not specified, cursor position defaults to the end on focus
        if (!cPos) {
            $(inputID).focus();
        }
        else {
            // move cursor to new position
            $(inputID)[0].selectionStart = cPos;
            $(inputID)[0].selectionEnd = cPos;
            $(inputID).focus();
        }
    };
    
    insert = function(val) {
        var cPos = $(inputID)[0].selectionStart;
        var entry = $(inputID).val();
        
        if (cPos == entry.length) {
            // append value to end of current string
            entry += val;
        }
        else {
            // split current string entry and insert new value
            var start = entry.slice(0, cPos);
            var end = entry.slice(cPos, entry.length);
            entry = start + val + end;
        }
        // replace input value with new entry
        $(inputID).val(entry);
        
        // advance cursor position and focus input
        entryFocus(cPos + 1);
    };

    // BUTTONS
    buttonPress = function(val, id) {
        $(id).click(function(){
            insert(val);
        });
    };
    
    // Numbers
    buttonPress('0', '#col-2-0');
    buttonPress('1', '#col-2-1');
    buttonPress('2', '#col-3-2');
    buttonPress('3', '#col-4-3');
    buttonPress('4', '#col-2-4');
    buttonPress('5', '#col-3-5');
    buttonPress('6', '#col-4-6');
    buttonPress('7', '#col-2-7');
    buttonPress('8', '#col-3-8');
    buttonPress('9', '#col-4-9');
    
    // Symbols
    buttonPress('=', '#col-1-equal');
    buttonPress('(', '#col-2-leftpar');
    buttonPress(')', '#col-3-rightpar');
    buttonPress(',', '#col-4-comma');
    buttonPress('/', '#col-5-div');
    buttonPress('*', '#col-5-mult');
    buttonPress('-', '#col-5-minus');
    buttonPress('+', '#col-5-plus');
    buttonPress('.', '#col-3-period');
    
    // Enter
    $('#col-5-enter').click(function(){
        evaluate();
    });
    
    // Clear
    $('#col-5-clear').click(function(){
        $(inputID).val('');
        entryFocus();
    });

    
    // KEYS
    $(inputID).keypress(function(e) {
        // Acceptable charCodes
        // ( ) * + , - . / : 40-47
        // 0-9 : 48-57
        // = : 61
        // ^ : 94
        // a-z : 97-122
        // A-Z : 65-90
        var cc = e.which;
        if ((cc >= 40 && cc <= 57) || cc === 61 || cc === 94 || cc === 94 || (cc >= 97 && cc <= 122) || (cc >= 65 && cc <= 90)) {
            var char = String.fromCharCode(cc);
            return insert(char);
        }
        return;
    });
    
    // Enter / Return
    $(inputID).keypress(function(e) {
        if (e.which === 13) {
            e.preventDefault();
            return evaluate();
        }
        return;
    });
});