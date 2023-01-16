window.onload = function() {
    let div = document.getElementById("divSadrzaj");

    //kreiranje buttona za logout
    let btnLogout = document.createElement("button");
    btnLogout.innerHTML = "Logout";
   /* 
    btnLogout.onclick = function () {
        PoziviAjax.postLogout(function(error, data) {});
    }
    */
    btnLogout.addEventListener("click", function() {
        PoziviAjax.postLogout(function(error, data) {});
    })
    div.appendChild(btnLogout);

    //kreiranje headinga
    let korisnickoIme = document.createElement("h1");
    korisnickoIme.innerHTML = "Dobrodošli!";
    div.appendChild(korisnickoIme);

    PoziviAjax.getPredmeti(function(error, data){
       //ispisati listu predmeta
       var ul = document.createElement("ul");
       for(let i = 0; i < data.length; i++) {
        ul.innerHTML = ul.innerHTML + "<li>" + data[i] + "</li>"
       }
       document.getElementById("predmeti").appendChild(ul);
    });
}