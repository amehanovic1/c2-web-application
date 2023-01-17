let prisustvo = {
    "studenti": [{
    "ime": "Neko Nekic",
    "index": 12345
    },
    {
    "ime": "Drugi Neko",
    "index": 12346
    }
    ],
    "prisustva": [{
    "sedmica": 1,
    "predavanja": 2,
    "vjezbe": 1,
    "index": 12345
    },
    {
    "sedmica": 1,
    "predavanja": 2,
    "vjezbe": 2,
    "index": 12346
    },
    {
    "sedmica": 2,
    "predavanja": 2,
    "vjezbe": 0,
    "index": 12345
    },
    {
    "sedmica": 2,
    "predavanja": 2,
    "vjezbe": 0,
    "index": 12346
    }
    ],
    "predmet": "Razvoj mobilnih aplikacija",
    "brojPredavanjaSedmicno": 2,
    "brojVjezbiSedmicno": 2
};

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
           lista[i].addEventListener("click", function() {
            //console.log("OK");
               PoziviAjax.getPredmet(lista[i].innerHTML, function(error, data) {
                 //data su podaci o predmeti
                 //tabela.innerText = data.studenti.ime;
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

       /* 
    btnLogout.onclick = function () {
        PoziviAjax.postLogout(function(error, data) {});
    }
    */
    

    /*var lista = "<ul>";
       for(let i = 0; i < data.length; i++) {
        lista += "<li>" + data[i] + "</li>";
       }
       lista += "</ul>"
   
    div.innerHTML = lista;*/
}