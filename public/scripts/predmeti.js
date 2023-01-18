//window.onload = function() {
    let divMeni = document.getElementById("divMeni");

    //ispis liste predmeta u meni
    PoziviAjax.getPredmeti(function(error, data){
       var ul = document.createElement("ul"); 
       for(let i = 0; i < data.length; i++) {
        ul.innerHTML = ul.innerHTML + "<li>" + data[i] + "</li>"
       }
       divMeni.appendChild(ul);   

       let divTabela = document.getElementById("divTabela");

       var predmeti = document.querySelectorAll("li");
       for(let i = 0; i < predmeti.length; i++){
        predmeti[i].addEventListener("click", function() {
            PoziviAjax.getPredmet(predmeti[i].innerHTML, function(error, data) {
                TabelaPrisustvo(divTabela, data);})
            });
        }
    });

    //kreiranje button-a za logout
    let btnLogout = document.createElement("button");
    btnLogout.innerHTML = "Odjava";
    btnLogout.addEventListener("click", function() {
        PoziviAjax.postLogout(function(error, data) {});
    })
    btnLogout.setAttribute("class", "btnLogout");
    divMeni.appendChild(btnLogout);
//}