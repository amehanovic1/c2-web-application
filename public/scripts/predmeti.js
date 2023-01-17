window.onload = function() {
    let div = document.getElementById("meni");

    PoziviAjax.getPredmeti(function(error, data){
       //ispisati listu predmeta
       var ul = document.createElement("ul"); 
       for(let i = 0; i < data.length; i++) {
        ul.innerHTML = ul.innerHTML + "<li>" + data[i] + "</li>"
       }
       div.appendChild(ul);   

       let tabela = document.getElementById("divSadrzaj");

       var lista = document.querySelectorAll("li");
       for(let i = 0; i< lista.length; i++){
           lista[i].addEventListener("click", function() {+
               PoziviAjax.getPredmet(lista[i].innerHTML, function(error, data) {
                 TabelaPrisustvo(tabela, data);
               })
           });
       }
   
    });

    //kreiranje buttona za logout
    let btnLogout = document.createElement("button");
    btnLogout.innerHTML = "Logout";
    btnLogout.addEventListener("click", function() {
        PoziviAjax.postLogout(function(error, data) {
        });
    })
    btnLogout.setAttribute("class", "btnLogout");
    div.appendChild(btnLogout);
}