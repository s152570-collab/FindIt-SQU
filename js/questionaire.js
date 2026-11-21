/*
WHAT IT DOES
It checks the answers of the questionnaire before the form is sent.
Four fields have their rule, written as a "regular expression" (a pattern that describes what correct text looks like):
    1. Full name – at two words, letters only
    2. SQU email – a student or a staff address of the university
    3. Phone – a number (optional, but checked if typed)
    4. Comments – at 15 characters and at least 3 real words
    The star rating (radio buttons) must also be chosen.
HOW THE FEEDBACK IS SHOWN
Bootstrap draws a border when we add the class "is-valid" and a red border plus the error text when we add "is-invalid".
*/

window.addEventListener("load",function(){
    var form= document.getElementById("feedbackForm");
    if(form==null){
        return;
    }
    var nameInput = document.getElementById("fullname");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
    var commentsInput = document.getElementById("comments");
    var ratingError = document.getElementById("ratingError");

    // set rules for name
    var NAME_RULE = /^[A-Za-z\u0600-\u06FF]{2,}(?:[ '\-][A-Za-z\u0600-\u06FF]{2,}){1,3}$/;
    // set rules for wmail
    var EMAIL_RULE = /^(?:s\d{6}@student\.squ\.edu\.om|[a-z]+(?:\.[a-z]+)*@squ\.edu\.om)$/i;
    // set rules for phone number
    var PHONE_RULE = /^(?:\+968[ ]?|00968[ ]?)?[279]\d{7}$/;
    // SET RULES FOR COMMENTS
    var COMMENTS_RULE = /^(?=(?:.*\b[A-Za-z]{3,}\b){3})[\s\S]{15,500}$/;

    function showResult(input,isValid){
        input.classList.toggle("is-valid",isValid);
        input.classList.toggle("is-invalid",!isValid);
    }
    function setMessage(input,text){
        var message=document.getElementById(input.id + "Feedback");
        if(message!==null){
            message.textContent = text;
        }
    }

    // check name
    function checkName(){
        var value = nameInput.value.trim();
        var ok = NAME_RULE.test(value);
        if(!ok){
            setMessage(nameInput,"please enter your first name and last name using letters only.");
        }
        showResult(nameInput,ok);
        return ok;
    }
    // check email
    function checkEmail(){
        var value = emailInput.value.trim();
        var ok = EMAIL_RULE.test(value);
        if(!ok){
            if(value===""){
                setMessage(emailInput,"The email is required.");
            }else{
                setMessage(emailInput,"USe youe SQU email, for examplle s123456@student.squ,edu,om.");
            }
        }
        showResult(emailInput,ok);
        return ok;
    }
    //check phone number
    function checkPhone(){
        var value = phoneInput.value.trim();
        if(value===""){ // empty phone number allowed (optional)
            phoneInput.classList.remove("is-valid","is-invalid");
            return true;
        }
        var ok = PHONE_RULE.test(value);
        if(!ok){
            setMessage(phoneInput,"Enter an Omani numebr: 8 digits startinh with 2,7 or 9.");

        }
        showResult(phoneInput,ok);
        return ok;
    }
    //check cmments
    function checkComments(){
        var value= commentsInput.value.trim();
        var ok = COMMENTS_RULE.test(value);
        if(!ok){
            setMessage(commentsInput,"Please write at least 15 characters and no more than 500.");
        }
        showResult(commentsInput,ok);
        return ok;

    }
    // check rating (must be chosen)
    function checkRating(){
        var chosen = form.querySelector('input[name="rating"]:checked');
        var ok = (chosen !== null);
        ratingError.classList.toggle("d-none",ok);
        return ok;
    }

    // blur happens when the user leaves a box;"input" happens at every keysroke
    nameInput.addEventListener("blur",checkName);
    emailInput.addEventListener("blur",checkEmail);
    phoneInput.addEventListener("blur",checkPhone);
    commentsInput.addEventListener("blur",checkComments);

    var slider = document.getElementById("recommend");
var sliderValue = document.getElementById("recommendValue");
if (slider && sliderValue) {
    slider.addEventListener("input", function () {
        sliderValue.textContent = slider.value;
    });
    slider.addEventListener("change", function () {
        sliderValue.textContent = slider.value;
    });
}
    var counter = document.getElementById("commentsCount");
    commentsInput.addEventListener("input",function(){
        counter.textContent = commentsInput.value.length;
    })
    form.addEventListener("submit",function(event){
        event.preventDefault();

        var nameOK = checkName();
        var emailOk = checkEmail();
        var phoneOK = checkPhone();
        var commentOK = checkComments();
        var ratingOk = checkRating();

        if (nameOK && emailOk && phoneOK && commentOK && ratingOk){
            form.submit();
        }
    });

    form.addEventListener("reset",function(){
        var fields = [nameInput,emailInput,phoneInput,commentsInput];
        for(var i=0; i<fields.length;i++){
            fields[i].classList.remove("is-valid","is-invalid");
        }
        ratingError.classList.add("d-none");
        sliderValue.textContent = "5";
        counter.textContent = "0";
    });

});
