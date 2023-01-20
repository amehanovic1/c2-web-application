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
    var prisustvoListaPromisea = [];
    return new Promise(function (resolve, reject) {
        studentiListaPromisea.push(db.studenti.create({ ime: "Neko Nekic", index: "12345"}));
        studentiListaPromisea.push(db.studenti.create({ ime: "Drugi Neko", index: "12346"}));
        studentiListaPromisea.push(db.studenti.create({ ime: "Treci Nekoi", index: "12347"}));

        Promise.all(studentiListaPromisea).then(function(studenti){
            var prvi = studenti.filter(function(s){return s.index == 12345})[0]; 
            var drugi = studenti.filter(function(s){return s.index == 12346})[0];
            var treci = studenti.filter(function(s){return s.index == 12347})[0];

           predmetiListaPromisea.push(db.predmeti.create({naziv: "Web tehnologije", brojPredavanjaSedmicno: 2, brojVjezbiSedmicno: 2}).then(function(p) {
                return p.setStudenti([prvi, drugi, treci]).then(function() {
                    return new Promise(function(resolve, reject) {resolve(p); });
                });
            }));

            predmetiListaPromisea.push(db.predmeti.create({naziv: "Računarska grafika", brojPredavanjaSedmicno: 2, brojVjezbiSedmicno: 2}).then(function(p) {
                return p.setStudenti([prvi, drugi]).then(function() {
                    return new Promise(function(resolve, reject) {resolve(p); });
                });
            }));

            predmetiListaPromisea.push(db.predmeti.create({naziv: "Verifikacija i validacija softvera", brojPredavanjaSedmicno: 2, brojVjezbiSedmicno: 2}).then(function(p) {
                return p.setStudenti([drugi, treci]).then(function() {
                    return new Promise(function(resolve, reject) {resolve(p); });
                });
            }));

            Promise.all(predmetiListaPromisea).then(function(predmeti){
                var wt = predmeti.filter(function(p){return p.naziv === "Web tehnologije"})[0]; 
                var rg = predmeti.filter(function(p){return p.naziv === "Računarska grafika"})[0]; 
                var vvs = predmeti.filter(function(p){return p.naziv === "Verifikacija i validacija softvera"})[0];

                nastavniciListaPromisea.push(
                    db.nastavnici.create({ username: "amehanovic2", password_hash: "$2b$10$Lp3gP9GA/OhfURK4NYiia.xMLkahboqoaSufK0.soSG8RWGgKaQce"}).then(function(n) {
                        return n.setNastavniciPredmeti([wt, vvs]).then(function() {
                            return new Promise(function(resolve, reject) {resolve(n); });
                        });
                    })
                );

                nastavniciListaPromisea.push(
                    db.nastavnici.create({ username: "username", password_hash: "$2b$10$2i4r8CFEsKp9JBDcjQ0dhOv6RIDFUJlf.iYm/5m7hv/.O/rrvwF4y"}).then(function(n) {
                        return n.setNastavniciPredmeti([rg]).then(function() {
                            return new Promise(function(resolve, reject) {resolve(n); });
                        });
                    })
                );
                Promise.all(nastavniciListaPromisea).then(function(n){resolve(n);});
            });

            //prisustvo za wt
            prisustvoListaPromisea.push(db.prisustva.create({sedmica: 2, predavanja: 1, vjezbe: 1, index: 12345, predmetId: 1}));
            prisustvoListaPromisea.push(db.prisustva.create({sedmica: 3, predavanja: 2, vjezbe: 2, index: 12345, predmetId: 1}));
            prisustvoListaPromisea.push(db.prisustva.create({sedmica: 4, predavanja: 0, vjezbe: 2, index: 12347, predmetId: 1}));
            //prisustvo za rg
            prisustvoListaPromisea.push(db.prisustva.create({sedmica: 5, predavanja: 1, vjezbe: 1, index: 12345, predmetId: 2}));
            prisustvoListaPromisea.push(db.prisustva.create({sedmica: 6, predavanja: 2, vjezbe: 2, index: 12345, predmetId: 2}));
            prisustvoListaPromisea.push(db.prisustva.create({sedmica: 7, predavanja: 0, vjezbe: 2, index: 12346, predmetId: 2}));
            //prisustvo za vvs
            prisustvoListaPromisea.push(db.prisustva.create({sedmica: 7, predavanja: 1, vjezbe: 1, index: 12346, predmetId: 3}));
            prisustvoListaPromisea.push(db.prisustva.create({sedmica: 10, predavanja: 2, vjezbe: 2, index: 12346, predmetId: 3}));
            prisustvoListaPromisea.push(db.prisustva.create({sedmica: 8, predavanja: 2, vjezbe: 2, index: 12346, predmetId: 3}));
            prisustvoListaPromisea.push(db.prisustva.create({sedmica: 9, predavanja: 2, vjezbe: 2, index: 12347, predmetId: 3}));
        });
    });
}
