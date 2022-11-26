let TabelaPrisustvo = function (divRef, podaci) {
    //privatni atributi modula
    //
    //divRef.textContent = "";


    let nazivPredmeta = document.createElement("h1");
    nazivPredmeta.textContent = podaci.predmet;
    divRef.appendChild(nazivPredmeta);

   

    //Zaglavlje 
    let tekst = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII - XV"];
    let tabela = document.createElement("table");
    

    // broj sedmica za koje racunamo prisustvo i trenutnu sedmicu
    const brojSedmica = [];
    // broj predavnja za trenutnu sedmicu
    const brojPredavanja = [];
    // broj vjezbi za  trenutnu sedmicu
    const brojVjezbi = [];

    for(let i = 0; i < podaci.prisustva.length; i++ ) {
        if (podaci.prisustva[i].index === podaci.studenti[0].index) {
            brojSedmica.push(podaci.prisustva[i].sedmica);
            brojPredavanja.push(podaci.prisustva[i].predavanja);
            brojVjezbi.push(podaci.prisustva[i].vjezbe);
        }
    }

    //sortirati prisustva po sedmicama za studenta
    brojSedmica.sort(function(x, y) {
        return x - y; 
    });

    //zaglavlje
    let tag, zaglavlje;
    let red = document.createElement("tr");
    for(let i = 1; i <= 10; i++ ) {
        tag = document.createElement("th")
        zaglavlje = document.createTextNode(tekst[i - 1]);

        if(i > 2 && brojSedmica.length > 0 && (i - 2) === brojSedmica[brojSedmica.length - 1] && brojSedmica.includes(i - 2)){
            tag.setAttribute("colspan", podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno);
            tag.className = "trenutna_sedmica";
        }
        else if(i === 10){
            tag.className = "sedmica_nije_odrzana";
        }
        else if(i === 1){
            tag.className = "ime_prezime";
        }
        else if(i === 2){
            tag.className = "index";
        }
        else {
            tag.className = "broj_sedmice";
        }

        tag.appendChild(zaglavlje);
        red.appendChild(tag);
    }
    tabela.appendChild(red);
    

    red = document.createElement("tr");
    red.className = "red_1";
    //ime i prezime
    tag = document.createElement("td");
    tag.setAttribute("rowspan", "2");
    zaglavlje = document.createTextNode(podaci.studenti[0].ime);
    tag.appendChild(zaglavlje);
    red.appendChild(tag);
    //index
    tag = document.createElement("td");
    tag.setAttribute("rowspan", "2");
    zaglavlje = document.createTextNode(podaci.studenti[0].index);
    tag.appendChild(zaglavlje);
    red.appendChild(tag);

    //crtanje kolona za prisustvo
    let noviRed;
    for(let i = 1; i <= 8; i++ ) {
        if(brojSedmica.length > 0 && i != brojSedmica[brojSedmica.length - 1] ){
            tag = document.createElement("td")
            tag.setAttribute("rowspan", "2");
            //ako nije trenutna sedmica
            if (brojSedmica.includes(i)) {
                zaglavlje = document.createTextNode(((brojPredavanja[i - 1] + brojVjezbi[i - 1]) / (podaci.brojPredavanjaSedmicno + podaci.brojVjezbiSedmicno)) * 100 + "%");
                tag.appendChild(zaglavlje);
            
            }
            red.appendChild(tag);
            
        }
        else {
            for(let j = 0; j < podaci.brojPredavanjaSedmicno; j++) {
                tag = document.createElement("td");
                tag.className = "predavnje_vjezba";
                zaglavlje = document.createTextNode("P");
                tag.appendChild(zaglavlje);
                noviRed = document.createElement("br");
                tag.appendChild(noviRed);
                tag.appendChild(document.createTextNode(j+1));

                red.appendChild(tag);
            }

            for(let j = 0; j < podaci.brojVjezbiSedmicno; j++) {
                tag = document.createElement("td");
                tag.className = "predavnje_vjezba";
                zaglavlje = document.createTextNode("V");

                tag.appendChild(zaglavlje);
                noviRed = document.createElement("br");
                tag.appendChild(noviRed);
                tag.appendChild(document.createTextNode(j+1));
                
                red.appendChild(tag);
            }
        }
    }
    tabela.appendChild(red);


    //kolona za prisustvo
    red = document.createElement("tr");
    red.className = "red_2";
    for(let j = 0; j < podaci.brojPredavanjaSedmicno; j++) {
        tag = document.createElement("td");
        if(j + 1 <= brojPredavanja[brojPredavanja.length - 1] ) {            
            tag.className = "prisustvo_da";
        }
        else {
            tag.className = "prisustvo_ne";
        }
        red.appendChild(tag);
    }

    for(let j = 0; j < podaci.brojVjezbiSedmicno; j++) {
        tag = document.createElement("td")
        //za trenutnu sedmicu
        if(j + 1 <= brojVjezbi[brojVjezbi.length - 1] ) {            
            tag.className = "prisustvo_da";
        }
        else {
            tag.className = "prisustvo_ne";
        }
        red.appendChild(tag);
    }
    tabela.appendChild(red);

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
    