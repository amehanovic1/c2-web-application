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
    return new Promise(function (resolve, reject) {
        studentiListaPromisea.push(db.studenti.create({ ime: "Neko Nekic", index: "12345"}));
        studentiListaPromisea.push(db.studenti.create({ ime: "Drugi Neko", index: "12346"}));
        studentiListaPromisea.push(db.studenti.create({ ime: "Treci Nekoi", index: "12347"}));

        nastavniciListaPromisea.push(db.nastavnici.create({ username: "amehanovic2", password_hash: "$2b$10$Lp3gP9GA/OhfURK4NYiia.xMLkahboqoaSufK0.soSG8RWGgKaQce"}));
        nastavniciListaPromisea.push(db.nastavnici.create({ username: "username", password_hash: "$2b$10$2i4r8CFEsKp9JBDcjQ0dhOv6RIDFUJlf.iYm/5m7hv/.O/rrvwF4y"}));


    });
}
