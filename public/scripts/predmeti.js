let divMeni = document.getElementById("divMeni");
let divTabela = document.getElementById("divTabela");

//ispis liste predmeta u meni
PoziviAjax.getPredmeti(function(error, data){
    if(data != null) {
        divMeni.setAttribute("class", "divMeni");
        var ul = document.createElement("ul"); 
        for(let i = 0; i < data.length; i++) {
            ul.innerHTML = ul.innerHTML + "<li>" + data[i] + "</li>"
        }
        divMeni.appendChild(ul);   
        
        //crtanje tabele prisustva
        var predmeti = document.querySelectorAll("li");
        for(let i = 0; i < predmeti.length; i++){
            predmeti[i].addEventListener("click", function() {
                PoziviAjax.getPredmet(predmeti[i].innerHTML, function(error, data) {
                    TabelaPrisustvo(divTabela, data);})
                });
            }

        //kreiranje button-a za logout
        let btnLogout = document.createElement("button");
        btnLogout.innerHTML = "Odjava";
        btnLogout.addEventListener("click", function() {
            PoziviAjax.postLogout(function(error, data) {});
        })
        btnLogout.setAttribute("class", "btnLogout");
        divMeni.appendChild(btnLogout);
    }
    else {
        document.getElementById("divTabela").innerHTML = error;
    }
});