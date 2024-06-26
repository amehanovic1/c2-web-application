let TabelaPrisustvo = function (divRef, podaci) {

    if(divRef === null || podaci === null) return;
    divRef.textContent = "";

    var sedmice = [];
    for (let i = 0; i < podaci.prisustva.length; i++) {
        if(!sedmice.includes(podaci.prisustva[i].sedmica)) {
            sedmice.push(podaci.prisustva[i].sedmica)
        }
    }
    sedmice.sort(function(x, y) {
        return x - y; 
    });

    var predavanja = [], vjezbe = [];
    for(let i = 0; i < podaci.prisustva.length; i ++) {
        predavanja.push(podaci.prisustva[i].predavanja);
        vjezbe.push(podaci.prisustva[i].vjezbe);
    }

    function daLiJeNegativanBrojPrisustva(prisustvo) {
        for(let i of prisustvo) {
            if(i < 0) return true;
        }
        return false;
    }

    function daLiPostojiSedmica() {
        let postoji;
        for(let i = 0; i < podaci.studenti.length; i++) {
            let student = podaci.studenti[i].index;
            let upisaneSedmice = [];
            postoji = false;
            for(let j = 0; j < podaci.prisustva.length; j++) {
                if(student === podaci.prisustva[j].index) {
                    if(!upisaneSedmice.includes(podaci.prisustva[j].sedmica)) {
                        upisaneSedmice.push(podaci.prisustva[j].sedmica);
                    }
                    else {
                        postoji = true;
                        break;
                    }
                }
            }
            if(postoji) break; 
        }
        if(postoji) {
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

    let trenutnaSedmicaDefault = Math.max.apply(null,sedmice);
    let trenutnaSedmica = trenutnaSedmicaDefault;

    var dugmePrethodnaSedmica = document.createElement("button");
    var iconPrethodna = document.createElement("i");
    iconPrethodna.className = 'fa fa-solid fa-arrow-left fa-2x';
    dugmePrethodnaSedmica.onclick = function () {
        prethodnaSedmica();
    }
    dugmePrethodnaSedmica.appendChild(iconPrethodna);

    var dugmeSljedecaSedmica = document.createElement("button");
    var iconSljedeca = document.createElement("i");
    iconSljedeca.className = 'fa fa-solid fa-arrow-right fa-2x';
    dugmeSljedecaSedmica.onclick = function () {
        sljedecaSedmica();
    }
    dugmeSljedecaSedmica.appendChild(iconSljedeca);

    if(Math.max.apply(null, predavanja) > podaci.brojPredavanjaSedmicno || Math.max.apply(null, vjezbe) > podaci.brojVjezbiSedmicno
    || daLiJeNegativanBrojPrisustva(predavanja) || daLiJeNegativanBrojPrisustva(vjezbe) 
    || daLiPostojiSedmica() || daLiPostojiIstiStudent()
    || daLiPostojiStudentKojiNijeUListi() || daLiPostojiSedmicaBezPrisustva()) {
        let poruka = document.createElement("p");
        poruka.textContent = "Podaci o prisustvu nisu validni!";
        divRef.appendChild(poruka);
        return;
    }

    crtanjeTabele(trenutnaSedmica);

    function crtanjeTabele(trenutna) {
        if(trenutna < 1 || trenutna > trenutnaSedmicaDefault) return;
        divRef.textContent = "";

        let nazivPredmeta = document.createElement("h1");
        nazivPredmeta.textContent = podaci.predmet;
        divRef.appendChild(nazivPredmeta);

        let tekstZaglavlja = [];
        switch(trenutnaSedmicaDefault) {
            case 0:
                tekstZaglavlja = ["Ime i prezime", "Index", "I - XV"];
                break;
            case 1:
                tekstZaglavlja = ["Ime i prezime", "Index", "I", "II - XV"];
                break;
            case 2:
                tekstZaglavlja = ["Ime i prezime", "Index", "I", "II", "III - XV"];
                break;
            case 3:
                tekstZaglavlja = ["Ime i prezime", "Index", "I", "II", "III", "IV - XV"];
                break;
            case 4:
                tekstZaglavlja = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V - XV"];
                break;
            case 5:
                tekstZaglavlja = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI - XV"];
                break;
            case 6:
                tekstZaglavlja = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII - XV"];
                break;
            case 7:
                tekstZaglavlja = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII - XV"];
                break;
            case 8:
                tekstZaglavlja = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX - XV"];
                break;
            case 9:
                tekstZaglavlja = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X - XV"];
                break;
            case 10:
                tekstZaglavlja = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI - XV"];
                break;
            case 11:
                tekstZaglavlja = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII - XV"];
                break;
            case 12:
                tekstZaglavlja = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII - XV"];
                break;
            case 13:
                tekstZaglavlja = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV - XV"];
                break;
            default:
                tekstZaglavlja = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV"];
        }

        let tabela = document.createElement("table");

        let dodavanjeTaga, tekst;
        let red = document.createElement("tr");
        for(let i = 0; i < tekstZaglavlja.length; i++ ) {
            dodavanjeTaga = document.createElement("th")
            tekst = document.createTextNode(tekstZaglavlja[i]);

            if(i > 1 && (i - 1) === trenutna){
                dodavanjeTaga.setAttribute("colspan", podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno);
                dodavanjeTaga.className = "trenutna_sedmica";
            }
            else if(i === tekstZaglavlja.length - 1){
                dodavanjeTaga.className = "sedmica_nije_odrzana";
            }
            else if(i === 0){
                dodavanjeTaga.className = "ime_prezime";
            }
            else if(i === 1){
                dodavanjeTaga.className = "index";
            }
            else {
                dodavanjeTaga.className = "broj_sedmice";
            }

            dodavanjeTaga.appendChild(tekst);
            red.appendChild(dodavanjeTaga);
        }

        tabela.appendChild(red);

        
        for(let i = 0; i < podaci.studenti.length; i++) {
            //broj predavanja i vjezbi za trenutnog studenta
            let brojPredavanja = 0, brojVjezbi = 0;
            for(let j = 0; j < podaci.prisustva.length; j++ ) {
                if (podaci.prisustva[j].index === podaci.studenti[i].index && podaci.prisustva[j].sedmica === trenutna) {
                    brojPredavanja = podaci.prisustva[j].predavanja;
                    brojVjezbi = podaci.prisustva[j].vjezbe;
                }
            }
            //sedmice prisustva za trenutnog studenta
            const sedmicePrisustva = [];
            for(let j = 0; j < podaci.prisustva.length; j++ ) {
                if (podaci.prisustva[j].index === podaci.studenti[i].index) {
                    sedmicePrisustva.push(podaci.prisustva[j].sedmica);
                }
            }
            sedmicePrisustva.sort(function(x, y) {
                return x - y; 
            });
                
            red = document.createElement("tr");
            red.className = "red_1";

            dodavanjeTaga = document.createElement("td");
            dodavanjeTaga.setAttribute("rowspan", "2");
            tekst = document.createTextNode(podaci.studenti[i].ime);
            dodavanjeTaga.appendChild(tekst);
            red.appendChild(dodavanjeTaga);

            dodavanjeTaga = document.createElement("td");
            dodavanjeTaga.setAttribute("rowspan", "2");
            tekst = document.createTextNode(podaci.studenti[i].index);
            dodavanjeTaga.appendChild(tekst);
            red.appendChild(dodavanjeTaga);

            for(let j = 1; j <= trenutnaSedmicaDefault + 1; j++ ) {
                if(j != trenutna){
                    dodavanjeTaga = document.createElement("td")
                    dodavanjeTaga.setAttribute("rowspan", "2");
                    
                    //ako nije trenutna sedmica a ima prisustvo, procenti za studenta
                    if (sedmicePrisustva.includes(j)) {
                        let brojPredavanjaStudent = 0; let brojVjezbiStudent = 0;
                        for(let k = 0; k < podaci.prisustva.length; k++ ) {
                            if (j === podaci.prisustva[k].sedmica && podaci.prisustva[k].index === podaci.studenti[i].index) {
                                brojPredavanjaStudent = podaci.prisustva[k].predavanja;
                                brojVjezbiStudent = podaci.prisustva[k].vjezbe;
                            }
                        }

                        tekst = document.createTextNode(Math.round(((brojPredavanjaStudent + brojVjezbiStudent) / (podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno)) * 100) + "%");
                        dodavanjeTaga.appendChild(tekst);
                    }
                    red.appendChild(dodavanjeTaga);
                }
                else {
                    for(let k = 0; k < podaci.brojPredavanjaSedmicno; k++) {
                        dodavanjeTaga = document.createElement("td");
                        dodavanjeTaga.className = "predavnje_vjezba";
                        tekst = document.createTextNode("P");
                        dodavanjeTaga.appendChild(tekst);
                        dodavanjeTaga.appendChild(document.createElement("br"));
                        dodavanjeTaga.appendChild(document.createTextNode(k + 1));
                        red.appendChild(dodavanjeTaga);
                    }
                    for(let k = 0; k < podaci.brojVjezbiSedmicno; k++) {
                        dodavanjeTaga = document.createElement("td");
                        dodavanjeTaga.className = "predavnje_vjezba";
                        tekst = document.createTextNode("V");
                        dodavanjeTaga.appendChild(tekst);
                        dodavanjeTaga.appendChild(document.createElement("br"));
                        dodavanjeTaga.appendChild(document.createTextNode(k + 1));
                        red.appendChild(dodavanjeTaga);
                    }
                }
            }
            tabela.appendChild(red);

            //kolone za prisustvo
            red = document.createElement("tr");
            red.className = "red_2";
        
            for(let j = 1; j <= podaci.brojPredavanjaSedmicno; j++) {
                let prisustvoPredavanja = document.createElement("td");
                //dodano
                prisustvoPredavanja.addEventListener("click", function () {
                    let brojacPredavanja = brojPredavanja;
                    let brojacVjezbi = brojVjezbi;
                    if(prisustvoPredavanja.className === "prisustvo_nije_uneseno") {
                        prisustvoPredavanja.className = "prisustvo_da";
                        brojacPredavanja = 1;
                        brojacVjezbi = 0;
                    }
                    else {
                        if(prisustvoPredavanja.className === "prisustvo_da") {
                            prisustvoPredavanja.className = "prisustvo_ne";
                            brojacPredavanja = brojacPredavanja - 1;
                        }
                        else {
                            prisustvoPredavanja.className = "prisustvo_da";
                            brojacPredavanja = brojacPredavanja + 1;
                        }
                    }
                    let prisustva = {sedmica: trenutna, predavanja: brojacPredavanja, vjezbe: brojacVjezbi}
                    PoziviAjax.postPrisustvo(podaci.predmet, podaci.studenti[i].index, prisustva, function(error, data) {});
                });
                //dodano
                if(sedmicePrisustva.includes(trenutna)) {
                    if(j <= brojPredavanja ) {            
                        prisustvoPredavanja.className = "prisustvo_da";
                    }
                    else {
                        prisustvoPredavanja.className = "prisustvo_ne";
                    }
                }
                else  {
                    prisustvoPredavanja.className = "prisustvo_nije_uneseno";
                } 
                red.appendChild(prisustvoPredavanja);
            }

            for(let j = 1; j <= podaci.brojVjezbiSedmicno; j++) {
                let prisustvoVjezbe = document.createElement("td");
                //dodano
                prisustvoVjezbe.addEventListener("click", function () {
                    let brojacPredavanja = brojPredavanja;
                    let brojacVjezbi = brojVjezbi;
                    if(prisustvoVjezbe.className === "prisustvo_nije_uneseno") {
                        prisustvoVjezbe.className = "prisustvo_da";
                        brojacVjezbi = 1;
                        brojacPredavanja = 0;
                    }
                    else {
                        if(prisustvoVjezbe.className === "prisustvo_da") {
                            prisustvoVjezbe.className = "prisustvo_ne";
                            brojacVjezbi = brojVjezbi - 1;
                        }
                        else {
                            prisustvoVjezbe.className = "prisustvo_da";
                            brojacVjezbi = brojVjezbi + 1;
                        }
                    }
                    let prisustva = {sedmica: trenutna, predavanja: brojacPredavanja, vjezbe: brojacVjezbi}
                    PoziviAjax.postPrisustvo(podaci.predmet, podaci.studenti[i].index, prisustva, function(error, data) {});
                });
                //dodano
                if(sedmicePrisustva.includes(trenutna)) {
                    if(j <= brojVjezbi ) {            
                        prisustvoVjezbe.className = "prisustvo_da";
                    }
                    else {
                        prisustvoVjezbe.className = "prisustvo_ne";
                    } 
                }
                else {
                    prisustvoVjezbe.className = "prisustvo_nije_uneseno";
                }
                red.appendChild(prisustvoVjezbe);
            }

            tabela.appendChild(red);
        }

        divRef.appendChild(tabela);
        divRef.appendChild(document.createElement("br"));
        divRef.appendChild(dugmePrethodnaSedmica);
        divRef.appendChild(dugmeSljedecaSedmica);
    }

    let sljedecaSedmica = function () {
        if(trenutnaSedmica < trenutnaSedmicaDefault) {
            trenutnaSedmica += 1;
            crtanjeTabele(trenutnaSedmica);
        }
    }
    let prethodnaSedmica = function () {
        if(trenutnaSedmica > 1) {
            trenutnaSedmica -= 1;
            crtanjeTabele(trenutnaSedmica);
        }
    }
    return {
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica
    }  
};
    