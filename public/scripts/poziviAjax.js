const PoziviAjax = (()=>{
    //fnCallback u svim metodama se poziva kada stigne odgovor sa servera putem Ajax-a
    // svaki callback kao parametre ima error i data, error je null ako je status 200 i data je tijelo odgovora
    // ako postoji greška poruka se prosljeđuje u error parametar callback-a, a data je tada null
    function impl_getPredmet(naziv,fnCallback){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200) {
                var jsonRez = JSON.parse(ajax.responseText);
                //fnCallback(null, jsonRez.status);
                if(jsonRez.greska != "Nastavnik nije loginovan") {
                    fnCallback(null, jsonRez); 
                }
                /*if(jsonRez.error != null) {
                    fnCallback(jsonRez.data, null);
                }
                else {
                    fnCallback(null, jsonRez);
                }*/
            }
            else if(ajax.readyState == 4) {
                fnCallback(ajax.statusText, null);
            }
        }
        ajax.open("GET", "http://localhost:3000/predmeti/" + naziv, true);
        ajax.send();
    }
    // vraća listu predmeta za loginovanog nastavnika ili grešku da nastavnik nije loginovan
    function impl_getPredmeti(fnCallback){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200) {
                var jsonRez = JSON.parse(ajax.responseText);
                //fnCallback(null, jsonRez.status);
                if(jsonRez.greska != "Nastavnik nije loginovan") {
                    fnCallback(null, jsonRez); 
                }
                /*if(jsonRez.error != null) {
                    fnCallback(jsonRez.data, null);
                }
                else {
                    fnCallback(null, jsonRez);
                }*/
            }
            else if(ajax.readyState == 4) {
                fnCallback(ajax.statusText, null);
            }
        }
        ajax.open("GET", "http://localhost:3000/predmeti", true);
        ajax.send();
    }
    
    function impl_postLogin(username, password, fnCallback){
       const data = {username: username, password: password};
         /*data.username = username;
        data.password = password;*/
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200) {
                var jsonRez = JSON.parse(ajax.responseText);
                if(jsonRez.poruka === "Uspjesna prijava") {
                    window.location.href = '/predmeti.html';
                }
                else {
                    fnCallback(null, jsonRez.poruka);
                }
                /*
                if(jsonRez.error != null) {
                    fnCallback(jsonRez.data, null);
                }
                else {
                    fnCallback(null, jsonRez);
                }
                */
            }
            else if(ajax.readyState == 4) {
                fnCallback(ajax.statusText, null);
            }
        }
        ajax.open("POST", "http://localhost:3000/login", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(data));
    }

    function impl_postLogout(fnCallback){
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200) {
                var jsonRez = JSON.parse(ajax.responseText);
                
                window.location.href = '/prijava.html';
                //fnCallback(null, jsonRez.status);
                /*
                if(jsonRez.error != null) {
                    fnCallback(jsonRez.data, null);
                }
                else {
                    fnCallback(null, jsonRez);
                }
                */
            }
            if(ajax.readyState == 4)
                fnCallback(ajax.statusText, null);
        }
        ajax.open("POST", "http://localhost:3000/logout", true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send();
    }
    //prisustvo ima oblik {sedmica:N,predavanja:P,vjezbe:V}
    function impl_postPrisustvo(naziv,index,prisustvo,fnCallback){
        let N = prisustvo.sedmica;
        let P = prisustvo.predavanja;
        let V = prisustvo.vjezbe;
        const data = {sedmica: N, predavanja: P, vjezbe: V};
        var ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if(ajax.readyState == 4 && ajax.status == 200) {
                var jsonRez = JSON.parse(ajax.responseText);
                let div = document.getElementById("divSadrzaj");
                //window.location.href = '/prijava.html';
                fnCallback(null, jsonRez);
                TabelaPrisustvo(div, jsonRez);
                /*
                if(jsonRez.error != null) {
                    fnCallback(jsonRez.data, null);
                }
                else {
                    fnCallback(null, jsonRez);
                }
                */
            }
            if(ajax.readyState == 4)
                fnCallback(ajax.statusText, null);
        }
        ajax.open("POST", "http://localhost:3000/prisustvo/predmet/" + naziv + "/student/" + index, true);
        ajax.setRequestHeader("Content-Type", "application/json");
        ajax.send(JSON.stringify(data));
    }
    return{
        postLogin: impl_postLogin,
        postLogout: impl_postLogout,
        getPredmet: impl_getPredmet,
        getPredmeti: impl_getPredmeti,
        postPrisustvo: impl_postPrisustvo
    };
})();
    