const db = require("./db.js");

db.sequelize.sync({force: true}).then(function(){
    inicijalizacija().then(function() {
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });
});

function inicijalizacija() {
    var studentiListaPromisea = [];
    var nastavniciListaPromisea = [];
    var predmetiListaPromisea = [];
    return new Promise(function (resolve, reject) {
        studentiListaPromisea.push(db.studenti.create({ ime: "Neko Nekic", index: "12345"}));
        studentiListaPromisea.push(db.studenti.create({ ime: "Drugi Neko", index: "12346"}));
        studentiListaPromisea.push(db.studenti.create({ ime: "Treci Nekoi", index: "12347"}));

        /*nastavniciListaPromisea.push(db.nastavnici.create({ username: "amehanovic2", password_hash: "$2b$10$Lp3gP9GA/OhfURK4NYiia.xMLkahboqoaSufK0.soSG8RWGgKaQce"}));
        nastavniciListaPromisea.push(db.nastavnici.create({ username: "username", password_hash: "$2b$10$2i4r8CFEsKp9JBDcjQ0dhOv6RIDFUJlf.iYm/5m7hv/.O/rrvwF4y"}));*/

        predmetiListaPromisea.push(db.predmeti.create({naziv: "Web tehnologije", brojPredavanjaSedmicno: 2, brojVjezbiSedmicno: 2}));
        predmetiListaPromisea.push(db.predmeti.create({naziv: "Računarska grafika", brojPredavanjaSedmicno: 2, brojVjezbiSedmicno: 2}));
        predmetiListaPromisea.push(db.predmeti.create({naziv: "Verifikacija i validacija softvera", brojPredavanjaSedmicno: 2, brojVjezbiSedmicno: 2}));

        Promise.all(predmetiListaPromisea).then(function(predmeti){

            /*var nastavnik1 = nastavnici.filter(function(n){return n.username === "amehanovic2"})[0]; 
            var nastavnik2 = nastavnici.filter(function(n){return n.username === "username"})[0];*/
            var wt = predmeti.filter(function(p){return p.naziv === "Web tehnologije"})[0]; 
            var rg = predmeti.filter(function(p){return p.naziv === "Računarska grafika"})[0]; 
            var vvs = predmeti.filter(function(p){return p.naziv === "Verifikacija i validacija softvera"})[0]; 
            
            nastavniciListaPromisea.push(
                db.nastavnici.create({ username: "amehanovic2", password_hash: "$2b$10$Lp3gP9GA/OhfURK4NYiia.xMLkahboqoaSufK0.soSG8RWGgKaQce"}).then(function(n) {
                    return n.setNastavniciPredmeti([wt, rg]).then(function() {
                    return new Promise(function(resolve, reject) {resolve(n); });
                    });
                })
            );

            nastavniciListaPromisea.push(
                db.nastavnici.create({ username: "username", password_hash: "$2b$10$2i4r8CFEsKp9JBDcjQ0dhOv6RIDFUJlf.iYm/5m7hv/.O/rrvwF4y"}).then(function(n) {
                    return n.setNastavniciPredmeti([vvs]).then(function() {
                    return new Promise(function(resolve, reject) {resolve(n); });
                    });
                })
            );
        })

    });
}
