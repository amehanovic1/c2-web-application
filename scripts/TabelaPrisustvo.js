let TabelaPrisustvo = function (divRef, podaci) {
    //privatni atributi modula
    //
    divRef.textContent = "";
    let noviRed;
    //naci max sedmicu za sve studente
    let sedmice = [];
    for (let i = 0; i < podaci.prisustva.length; i++) {
        if(!sedmice.includes(podaci.prisustva[i].sedmica)) {
            sedmice.push(podaci.prisustva[i].sedmica)
        }
    }

    var prethodnaDugme = document.createElement("button");
    var icon = document.createElement("i");
    icon.className = 'fa fa-solid fa-arrow-left fa-2x';
    prethodnaDugme.appendChild(icon);

    var sljedecaDugme = document.createElement("button");
    var icon = document.createElement("i");
    icon.className = 'fa fa-solid fa-arrow-right fa-2x';
    sljedecaDugme.appendChild(icon);

    let trenutnaSedmica = Math.max.apply(null,sedmice);
    let trenutna = trenutnaSedmica;
    crtanjeTabele(trenutnaSedmica);

    function crtanjeTabele(trenutna) {
        if(trenutna < 1 || trenutna > trenutnaSedmica) return;
        divRef.textContent = "";
        let predavanja = [], vjezbe = [];
        for(let i = 0; i < podaci.prisustva.length; i ++) {
            predavanja.push(podaci.prisustva[i].predavanja);
            vjezbe.push(podaci.prisustva[i].vjezbe);
        }

        function daLiJeNegativan(niz) {
            for(var n of niz) {
                if(n < 0) return true;
            }
            return false;
        }

        function daLiPostojiSedmica() {
            let upisana;
            for(let i = 0; i < podaci.studenti.length; i++) {
                let student = podaci.studenti[i].index;
                let upisaneSedmice = [];
                upisana = false;
                for(let j = 0; j < podaci.prisustva.length; j++) {
                    if(student === podaci.prisustva[j].index) {
                        if(!upisaneSedmice.includes(podaci.prisustva[j].sedmica)) {
                            upisaneSedmice.push(podaci.prisustva[j].sedmica);
                        }
                        else {
                            upisana = true;
                            break;
                        }
                    }
                }
                if(upisana) break; 
            }
            if(upisana) {
                return true;
            }
            return false;
        }

        function daLiPostojiIstiStudent() {
            let postoji = false;
            let studenti = [];
            for(let i = 0; i < podaci.studenti.length; i++) {
                if(!studenti.includes(podaci.studenti[i].index)) {
                    studenti.push(podaci.studenti[i].index);
                }
                else {
                    postoji = true;
                    break;
                }
            }
            if(postoji) return true;
            return false;
        }

        function daLiPostojiStudentKojiNijeUListi() {
            let studentiPrisustvo = [];
            let studenti = [];
            let postoji = false;
            for(let i = 0; i < podaci.studenti.length; i++) {
                studenti.push(podaci.studenti[i].index);
            }

            for(let i = 0; i < podaci.prisustva.length; i++) {
                if(!studenti.includes(podaci.prisustva[i].index)){
                    postoji = true;
                    break;
                }
            }
            
            if(postoji) return true;
            return false;
        }

        //sortirane sedmice
        sedmice.sort(function(x, y) {
            return x - y; 
        });

        function daLiPostojiSedmicaBezPrisustva() {
            let postoji = false;

            for(let i = 1; i <= sedmice.length - 1; i++) { 
                if(sedmice[i - 1] + 1 != sedmice[i]) {
                    postoji = true;
                    break;
                }
            }
            if(postoji) return true;
            return false;
        }

        if(Math.max.apply(null, predavanja) > podaci.brojPredavanjaSedmicno || Math.max.apply(null, vjezbe) > podaci.brojVjezbiSedmicno
        || daLiJeNegativan(predavanja) || daLiJeNegativan(vjezbe) || daLiPostojiSedmica() || daLiPostojiIstiStudent()
        || daLiPostojiStudentKojiNijeUListi() || daLiPostojiSedmicaBezPrisustva()) {
            let poruka = document.createElement("p");
            poruka.textContent = "Podaci o prisustvu nisu validni!";
            divRef.appendChild(poruka);
        }
        else {
            let nazivPredmeta = document.createElement("h1");
            nazivPredmeta.textContent = podaci.predmet;
            divRef.appendChild(nazivPredmeta);

            //zaglavlje
            let tekst = [];
            switch(trenutnaSedmica) {
                case 0:
                    tekst = ["Ime i prezime", "Index", "I - XV"];
                    break;
                case 1:
                    tekst = ["Ime i prezime", "Index", "I", "II - XV"];
                    break;
                case 2:
                    tekst = ["Ime i prezime", "Index", "I", "II", "III - XV"];
                    break;
                case 3:
                    tekst = ["Ime i prezime", "Index", "I", "II", "III", "IV - XV"];
                    break;
                case 4:
                    tekst = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V - XV"];
                    break;
                case 5:
                    tekst = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI - XV"];
                    break;
                case 6:
                    tekst = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII - XV"];
                    break;
                case 7:
                    tekst = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII - XV"];
                    break;
                case 8:
                    tekst = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX - XV"];
                    break;
                case 9:
                    tekst = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X - XV"];
                    break;
                case 10:
                    tekst = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI - XV"];
                    break;
                case 11:
                    tekst = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII - XV"];
                    break;
                case 12:
                    tekst = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII - XV"];
                    break;
                case 13:
                    tekst = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV - XV"];
                    break;

                default:
                    tekst = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"];
            }

            let tabela = document.createElement("table");
            let tag, zaglavlje;
            let red = document.createElement("tr");
            for(let i = 0; i < tekst.length; i++ ) {
                tag = document.createElement("th")
                zaglavlje = document.createTextNode(tekst[i]);

                if(i > 1 && i - 1 == trenutna){
                    tag.setAttribute("colspan", podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno);
                    tag.className = "trenutna_sedmica";
                }
                else if(i === tekst.length - 1){
                    tag.className = "sedmica_nije_odrzana";
                }
                else if(i === 0){
                    tag.className = "ime_prezime";
                }
                else if(i === 1){
                    tag.className = "index";
                }
                else {
                    tag.className = "broj_sedmice";
                }

                tag.appendChild(zaglavlje);
                red.appendChild(tag);
            }
            tabela.appendChild(red);

            for( let i = 0; i < podaci.studenti.length; i++ ) {
                //broj predavnja i vjezbi za trenutnu sedmicu
                let brojPredavanja = 0, brojVjezbi = 0;
                for(let j = 0; j < podaci.prisustva.length; j++ ) {
                    if (podaci.prisustva[j].index === podaci.studenti[i].index) {
                        brojPredavanja = podaci.prisustva[j].predavanja;
                        brojVjezbi = podaci.prisustva[j].vjezbe;
                    }
                }

                //sedmice za koje racunamo prisustvo 
                const brojSedmica = [];
                for(let j = 0; j < podaci.prisustva.length; j++ ) {
                    if (podaci.prisustva[j].index === podaci.studenti[i].index) {
                        brojSedmica.push(podaci.prisustva[j].sedmica);
                    }
                }

                //sortirati prisustva po sedmicama za studenta
                brojSedmica.sort(function(x, y) {
                    return x - y; 
                });
                
                red = document.createElement("tr");
                red.className = "red_1";

                //ime i prezime
                tag = document.createElement("td");
                tag.setAttribute("rowspan", "2");
                zaglavlje = document.createTextNode(podaci.studenti[i].ime);
                tag.appendChild(zaglavlje);
                red.appendChild(tag);

                //index
                tag = document.createElement("td");
                tag.setAttribute("rowspan", "2");
                zaglavlje = document.createTextNode(podaci.studenti[i].index);
                tag.appendChild(zaglavlje);
                red.appendChild(tag);

                //crtanje kolona za prisustvo
                
                for(let j = 1; j <= trenutnaSedmica + 1; j++ ) {
                    if(j != trenutna){
                        tag = document.createElement("td")
                        tag.setAttribute("rowspan", "2");
                        //ako nije trenutna sedmica a ima prisustvo
                        if (brojSedmica.includes(j)) {
                            zaglavlje = document.createTextNode(((brojPredavanja + brojVjezbi) / (podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno)) * 100 + "%");
                            tag.appendChild(zaglavlje);
                        
                        }
                        red.appendChild(tag);
                        
                    }
                    else {
                        if (brojSedmica.includes(j)) {
                            for(let j = 0; j < podaci.brojPredavanjaSedmicno; j++) {
                                tag = document.createElement("td");
                                tag.className = "predavnje_vjezba";
                                zaglavlje = document.createTextNode("P");
                                tag.appendChild(zaglavlje);
                                noviRed = document.createElement("br");
                                tag.appendChild(noviRed);
                                tag.appendChild(document.createTextNode(j + 1));

                                red.appendChild(tag);
                            }

                            for(let j = 0; j < podaci.brojVjezbiSedmicno; j++) {
                                tag = document.createElement("td");
                                tag.className = "predavnje_vjezba";
                                zaglavlje = document.createTextNode("V");

                                tag.appendChild(zaglavlje);
                                noviRed = document.createElement("br");
                                tag.appendChild(noviRed);
                                tag.appendChild(document.createTextNode(j + 1));
                                
                                red.appendChild(tag);
                            }
                        }
                        else {
                            tag = document.createElement("td")
                            tag.setAttribute("rowspan", "2");
                            tag.setAttribute("colspan", podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno);
                            red.appendChild(tag);
                        }
                    }
                }
                tabela.appendChild(red);


                //kolona za prisustvo
                if(trenutna != 0){
                    red = document.createElement("tr");
                    red.className = "red_2";
                    if(brojSedmica.includes(trenutna)) {
                        
                    
                        for(let j = 1; j <= podaci.brojPredavanjaSedmicno; j++) {
                            tag = document.createElement("td");
                            if(j <= brojPredavanja ) {            
                                tag.className = "prisustvo_da";
                            }
                            else {
                                tag.className = "prisustvo_ne";
                            }
                            red.appendChild(tag);
                        }

                        for(let j = 1; j <= podaci.brojVjezbiSedmicno; j++) {
                            tag = document.createElement("td")
                            //za trenutnu sedmicu
                            if(j <= brojVjezbi ) {            
                                tag.className = "prisustvo_da";
                            }
                            else {
                                tag.className = "prisustvo_ne";
                            }
                            red.appendChild(tag);
                        }
                    }
                }
                tabela.appendChild(red);
            }

            divRef.appendChild(tabela);

            

            divRef.appendChild(document.createElement("br"));
            divRef.appendChild(prethodnaDugme);
            divRef.appendChild(sljedecaDugme);
        }
    }

    //implementacija metoda
    let sljedecaSedmica = function () {
        sljedecaDugme.onclick = function () {
            trenutna += 1;
            crtanjeTabele(trenutna);
        }
    }
    let prethodnaSedmica = function () {
        prethodnaDugme.onclick = function () {
            trenutna -=1;
            crtanjeTabele(trenutna);
        }
    }
    return {
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica
    }  
};
    