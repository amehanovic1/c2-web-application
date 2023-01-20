const Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    const Student = sequelize.define("Student", {
        index: { type: Sequelize.INTEGER, primaryKey: true},
        ime: Sequelize.STRING
    }, { tableName: "Studenti", timestamps: false });
    return Student;
};