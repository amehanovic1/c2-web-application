let TabelaPrisustvo = function (divRef, podaci) {
    //privatni atributi modula
    //
    divRef.textContent = "";

    let nazivPredmeta = document.createElement("h1");
    nazivPredmeta.textContent = podaci.predmet;
    divRef.appendChild(nazivPredmeta);

    //Zaglavlje 
    let tekst = ["Ime i prezime", "Index", "I", "II", "III", "IV", "V", "VI", "VII", "VIII - XV"];
    let tabela = document.createElement("table");
    let red = document.createElement("tr");

    for (let i = 0; i < tekst.length; i++) {
        let tag = document.createElement("th");
        let zaglavlje = document.createTextNode(tekst[i]);
        tag.appendChild(zaglavlje);
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
    