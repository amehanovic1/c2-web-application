const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    const Nastavnik = sequelize.define("Nastavnik", {
        username: Sequelize.STRING,
        password_hash: Sequelize.STRING
    }, { tableName: "Nastavnici", timestamps: false });
    return Nastavnik;
};