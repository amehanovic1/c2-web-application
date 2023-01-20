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