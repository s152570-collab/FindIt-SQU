/*
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