//konekcija na bazu
const Sequelize = require("sequelize");
//prosljedjivanje parametara odvojeno
const sequelize = new Sequelize("wt22", "root", "password", {
    host: "localhost",
    dialect: "mysql"
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//import modela
db.studenti = require("./studenti.js") (sequelize);
db.nastavnici = require("./nastavnici.js") (sequelize);
db.predmeti = require("./predmeti.js") (sequelize);
db.prisustva = require("./prisustva.js") (sequelize);

//nastavnik moze predavati vise predmeta
db.nastavnici.hasMany(db.predmeti, {as: 'nastavniciPredmeti' });

//predmet moze imati vise prisustva o studentima
db.predmeti.hasMany(db.prisustva, {as: 'predmetiPrisustva', foreignKey: 'predmetId'});

//student moze imati vise prisustva 
db.studenti.hasMany(db.prisustva, {as: 'studentiPrisustva', foreignKey: 'index'});

//vezan-m student moze imati vise predmeta, a predmet vise studenata
db.studentPredmet = db.predmeti.belongsToMany(db.studenti, {as: 'studenti', through: 'student_predmet', foreignKey: 'predmetiId'});
db.studenti.belongsToMany(db.predmeti, {as: 'predmeti', through: 'student_predmet', foreignKey: 'index'});

module.exports = db;

//testiranje konekcije
/*try {
    await sequelize.authenticate();
    console.log('Uspješno uspostavljena konekcija.');
}
catch (error) {
    console.error('Konektoavnje sa bazom nije moguće:', error);
}*/

//zatvaranje konekcije
//sequelize.close();