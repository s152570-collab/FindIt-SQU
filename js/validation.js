/*
HOW IT WORKS
    1. Every form with the class="needs-validation" gets checked
    2. when someone hits, submit, the browsers rules such as required, type="email" are tested using form.checkValidity()
    3. if field is not valid, the submit stops and the form receives the bootstrap class="was-validated".
    Bootstrap then shows borders and the text inside each "invalid-feedback"

    4.if all fields padd, the form goes through as usual
*/

window.addEventListener("load",function(){
    var forms = document.querySelectorAll(".needs-validation");
    // go through forms one by one
    for(var i=0; i< forms.length;i++){
        var form = forms[i];

        form.addEventListener("submit",function(event){

            if(!this.checkValidity()){
                event.preventDefault();
                event.stopPropagation();
            }

            this.classList.add("was-validated");

        });

        form.addEventListener("reset",function(){
            this.classList.remove("was-validated");
        })
    }
})
