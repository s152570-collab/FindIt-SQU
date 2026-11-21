/*
*/

window.addEventListener("load", function () {
    // the bar that holds the text
    var bar = document.getElementById("tickerBar");
    // the text that moves inside the bar
    var textBox = document.getElementById("tickerText");

    // stop if this page has no banner
    if(bar== null || textBox == null){
        return;
    }

    var position = bar.offsetWidth;

    var speed = 2; // text move each step

    function buildMessage(){
        var now = new Date(); // A Date object holds the current date and time

        var dateText = now.toLocaleDateString("en-GB",{
            weekday : "long",
            day: "numeric",
            month : "long",
            year : "numeric"
        });
        // convert the time to text
        var timeText = now.toLocaleTimeString("en-US");

        // return the String = welcome message
        return "Welcome to the FindIT@SQU website, Today is " + dateText +
        ", and the time is " + timeText +".";
    }

    // show the message
    function updateMessage(){
        textBox.textContent = buildMessage();
    }
    // move the text
    function moveBanner(){
        position = position - speed;

        if(position < -textBox.offsetWidth){
            position = bar.offsetWidth;
        }
        // aplly the new position
        textBox.style.left = position + "px";
    }

    // show the message
    updateMessage();
    //Refresh the clock inside the message every 1 second
    setInterval(updateMessage,1000);
    // Move the text every 20 millisecond
    setInterval(moveBanner,20);
})