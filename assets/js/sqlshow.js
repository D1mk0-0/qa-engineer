var captionLength = 0;

var caption = "CREATE TABLE employee (\
    <br \/> id BIGSERIAL NOT NULL PRIMARY KEY,\
    <br \/> first_name VARCHAR(50) NOT NULL,\
    <br \/> last_name VARCHAR(50) NOT NULL,\
    <br \/> gender VARCHAR(6) NOT NULL,\
    <br \/> email VARCHAR(150),\
    <br \/> date_of_birth DATE NOT NULL,\
    <br \/> country_of_birth VARCHAR (50) NOT NULL\
    <br \/>)\;";


$(document).ready(function() {
    setInterval ('cursorAnimation()', 600);
    captionEl = $('#caption');
    
    $('#test-typing').click(function(){
        testTypingEffect();
    });

    $('#test-erasing').click(function(){
        testErasingEffect();
    });
});

function testTypingEffect() {
    caption;
    type();
}

function type() {
    captionEl.html(caption.substr(0, captionLength++));
    if(captionLength < caption.length+1) {
        setTimeout('type()', 50);
    } else {
        captionLength = 0;
        caption = '';
    }
}

function testErasingEffect() {
    caption = captionEl.html();
    captionLength = caption.length;
    if (captionLength>0) {
        erase();
    } else {
        $('#caption').html("You didn't write anything to erase, but that's ok!");
        setTimeout('testErasingEffect()', 1000);
    }
}

function erase() {
    captionEl.html(caption.substr(0, captionLength--));
    if(captionLength >= 0) {
        setTimeout('erase()', 50);
    } else {
        captionLength = 0;
        caption = '';
    } 
}

function cursorAnimation() {
    $('#cursor').animate({
        opacity: 0
    }, 'fast', 'swing').animate({
        opacity: 1
    }, 'fast', 'swing');
}