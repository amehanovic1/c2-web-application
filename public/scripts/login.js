function prijavi() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    /*submit = document.getElementById("submit");
    submit.addEventListener("click", function() {
        PoziviAjax.postLogin(username, password, function(error, data){});
    })*/
    PoziviAjax.postLogin(username, password, function(error, data){});
}