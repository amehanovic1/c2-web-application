function prijaviSe() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;
    PoziviAjax.postLogin(username, password, function(error, data){
        document.getElementById("poruka").innerHTML = data;
    });
}