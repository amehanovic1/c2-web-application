const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    const Prisustvo = sequelize.define("Prisustvo", {
        sedmica: Sequelize.INTEGER,
        predavanja: Sequelize.INTEGER,
        vjezbe: Sequelize.INTEGER,
        index: Sequelize.INTEGER
    }, { tableName: "Prisustva", timestamps: false });
    return Prisustvo;
}