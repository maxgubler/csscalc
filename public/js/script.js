var initialHeight;
var inputID = '#calc-screen-text-entry';
var calcHistory = [];
var cursorPosition = 0;

$(function(){
    // SCALING
    // Get initial height for use in resizing
    initialHeight = $('#calc-outer').height();
    
    // Set height to fill window
    $('#calc-outer').css('height', '100%');
    
    // Resize and show calculator
    resizeWidthAndFont();
    $('#calc-outer').removeClass('hidden');
    $(window).resize(function() {
        resizeWidthAndFont();
    });

    // BUTTONS
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
    buttonPress('^', '#col-5-carrot');
    
    // Common variable letters
    buttonPress('x', '#col-1-x');
    buttonPress('y', '#col-2-y');
    buttonPress('z', '#col-3-z');
    buttonPress('t', '#col-4-t');
    
    // Enter
    $('#col-5-enter').click(function() {
        evaluate();
    });
    
    // Clear
    $('#col-5-clear').click(function() {
        clear();
    });
    
    // Backspace
    $('#col-4-backspace').click(function() {
        backspace(); 
    });
    
    // Arrow Left
    $('#arrow-left').click(function() {
        arrowLeft();
    });
    
    // Arrow Right
    $('#arrow-right').click(function() {
        arrowRight();
    });
    
    
    // KEYS
    $(document).keypress(function(e) {
        // Acceptable codes
        // ( ) * + , - . / : 40-47
        // 0-9 : 48-57
        // = : 61
        // ^ : 94
        // a-z : 97-122
        // A-Z : 65-90
        var key = e.which;
        if ((key >= 40 && key <= 57) || key === 61 || key === 94 || key === 94 || (key >= 97 && key <= 122) || (key >= 65 && key <= 90)) {
            var char = String.fromCharCode(key);
            e.preventDefault();
            insert(char);
        }
    });
    
    // Enter / Return
    $(document).keypress(function(e) {
        if (e.which === 13) {
            e.preventDefault();
            evaluate();
        }
    });
    
    // Backspace
    $(document).keydown(function(e) {
        if (e.which === 8) {
            e.preventDefault();
            backspace();
        } 
    });
    // Prevent backspace from acting as browser back button
    $(window).keydown(function(e) {
        if (e.which === 8) {
            e.preventDefault();
        }
    });
    
    // Arrow Up / Down
    $(document).keydown(function(e) {
        if (e.which === 38 || e.which === 40) {
            e.preventDefault();
        }
        else if (e.which === 37) {
            arrowLeft();
        }
        else if (e.which === 39) {
            arrowRight();
        }
    });
    
    
    
    // On document load create input overlay, set input to readonly, and focus
    $(inputID).after('<div id="inputCover"></div>');
    $(inputID).attr('readonly','readonly');
    entryFocus($(inputID).val().length);
});



function resizeWidthAndFont() {
    var h = $('#calc-outer').height();
    var newHeight = (h / initialHeight * 100);
    $('#calc-outer').css('width', h / 2);
    $('body').css('font-size', newHeight + '%');
}
function recordHistory(ent, res) {
	// create local data object and push it to the history array
	var data = {entry:ent, result:res};
	calcHistory.push(data);
}
function displayHistory() {
    var numStored = calcHistory.length;
    var htmlList = '';
    for (var i = 0; i < numStored; i++) {
        htmlList += '<li id=hist' + i + '><div>' + calcHistory[i].entry + '</div><div>' + calcHistory[i].result + '</div></li>';
    }
    $('#calc-screen-history ul').html(htmlList);
}
function evaluate() {
    var entryLen;
    $(inputID).val(function(index, entry){
       var result = math.eval(entry).toString();
       recordHistory(entry, result);
       return entry;
    });
    displayHistory();
    entryFocus();
}
function entryFocus(cPos) {
    // cPos is the desired cursor position
    // if not specified, cursor position defaults to the end on focus
    if (!cPos && cPos !== 0) {
        $(inputID).focus();
    }
    else {
        // move cursor to desired position
        $(inputID)[0].selectionStart = cPos;
        $(inputID)[0].selectionEnd = cPos;
        $(inputID).focus();
        cover(cPos);
    }
}
function insert(val) {
    var entry = $(inputID).val();
    
    if (cursorPosition == entry.length) {
        // append value to end of string
        entry += val;
    }
    else {
        // split string entry and insert new value
        var start = entry.slice(0, cursorPosition);
        var end = entry.slice(cursorPosition, entry.length);
        entry = start + val + end;
    }
    // replace input value with new entry
    $(inputID).val(entry);
    
    // advance cursor position and focus input
    entryFocus(++cursorPosition);
}
function backspace() {
    var entry = $(inputID).val();
    if (cursorPosition == 0) {
        return;
    }
    else {
        // trim char from end of the starting substring
        var start = entry.slice(0, cursorPosition - 1);
        var end = entry.slice(cursorPosition, entry.length);
        entry = start + end;
    }
    // replace input value with new entry
    $(inputID).val(entry);
    
    // decrement cursor position and focus input
    entryFocus(--cursorPosition);
}
function clear() {
    $(inputID).val('');
    cursorPosition = 0;
    entryFocus(cursorPosition);
}
function buttonPress(val, id) {
    $(id).click(function(){
        insert(val);
    });
}
function cover(cPos) {
    var entry = $(inputID).val();
    var start = entry.slice(0, cPos);
    var end = entry.slice(cPos, entry.length);
    $('#inputCover').html('<span>' + start + '</span><span>' + end + '</span>');
}
function arrowLeft() {
    if (cursorPosition != 0) {
        // decrement cursor position and focus input
        entryFocus(--cursorPosition);
    }
    else {
        entryFocus(cursorPosition);
    }
}
function arrowRight() {
    if (cursorPosition != $(inputID).val().length) {
        entryFocus(++cursorPosition);
    }
    else {
        entryFocus(cursorPosition);
    }
}