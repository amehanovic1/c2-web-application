const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    const Predmet = sequelize.define("Predmet", {
        naziv: Sequelize.STRING,
        brojPredavanjaSedmicno: Sequelize.INTEGER,
        brojVjezbiSedmicno: Sequelize.INTEGER
        /*idNastavnik: Sequelize.INTEGER*/
    }, { tableName: "Predmeti" });
    return Predmet;
}

