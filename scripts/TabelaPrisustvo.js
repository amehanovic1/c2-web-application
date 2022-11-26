let TabelaPrisustvo = function (divRef, podaci) {
    //privatni atributi modula
    //
    divRef.textContent = "";

    let nazivPredmeta = document.createElement("h1");
    nazivPredmeta.textContent = podaci.predmet;
    divRef.appendChild(nazivPredmeta);
    
    //naci max sedmicu za sve studente
    const sedmice = [];
    for (let i = 0; i < podaci.prisustva.length; i++) {
        sedmice.push(podaci.prisustva[i].sedmica)
    }

    let trenutnaSedmica = Math.max.apply(null,sedmice);

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

        if(i > 1 && i - 1 == trenutnaSedmica ){
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
        let noviRed;
        for(let j = 1; j <= trenutnaSedmica + 1; j++ ) {
            if(j != trenutnaSedmica){
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
        if(trenutnaSedmica != 0){
            red = document.createElement("tr");
            red.className = "red_2";
            if(brojSedmica.includes(trenutnaSedmica)) {
                
            
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

    //implementacija metoda
    let sljedecaSedmica = function () {
    }
    let prethodnaSedmica = function () {
    }
    return {
        sljedecaSedmica: sljedecaSedmica,
        prethodnaSedmica: prethodnaSedmica
    }
};
    