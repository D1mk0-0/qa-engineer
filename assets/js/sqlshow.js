var captionLength = 0;

var caption = '';

var ready = '';

var create = "CREATE TABLE employee (\
    <br \/> id BIGSERIAL NOT NULL PRIMARY KEY,\
    <br \/> first_name VARCHAR(50) NOT NULL,\
    <br \/> last_name VARCHAR(50) NOT NULL,\
    <br \/> gender VARCHAR(6) NOT NULL,\
    <br \/> email VARCHAR(150),\
    <br \/> date_of_birth DATE NOT NULL,\
    <br \/> country_of_birth VARCHAR (50) NOT NULL\
    <br \/>)\;";

var insert = "INSERT INTO employee (\
    <br \/> first_name,\
    <br \/> last_name,\
    <br \/> gender,\
    <br \/> email,\
    <br \/> date_of_birth,\
    <br \/> country_of_birth\
    <br \/> )\
    <br \/> VALUES ('John', 'Doe', 'MALE', 'jd@mail.com', '2000-01-01', 'United Kingdom');";

var select = "SELECT country_of_birth, COUNT(*) > 10\
    <br \/> FROM employee GROUP BY country_of_birth\
    <br \/> HAVING COUNT(*) > 10\
    <br \/> ORDER BY country_of_birth DESC;";

$(document).ready(function() {
    setInterval ('cursorAnimation()', 600);
    captionEl = $('#caption');

    $('#test-create').click(function(){
        captionLength = 0;
        ready = create;
        testTypingEffect();
    });

    $('#test-insert').click(function(){
        captionLength = 0;
        ready = insert;
        testTypingEffect();
    });

    $('#test-select').click(function(){
        captionLength = 0;
        ready = select;
        testTypingEffect();
    });

    

});

function testTypingEffect() {
    captionEl.html(caption.substr(0, captionLength--));
    if(captionLength >= 0) {
        erase();
    } else {
        caption = ready;
        type();
    }
}

function type() {
    captionEl.html(caption.substr(0, captionLength++));
    if(captionLength < caption.length+1) {
        setTimeout('type()', 50);
    };
}

function erase() {
    captionEl.html(caption.substr(0, captionLength--));
    if(captionLength >= 0) {
        setTimeout('erase()', 5);
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