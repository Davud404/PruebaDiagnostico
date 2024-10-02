"use strict";

const fs = require("fs");
const path = require("path");
const { Sequelize, DataTypes } = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
// Inicializar Sequelize con la configuración
sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

// Leer directorio y cargar modelos
fs.readdirSync(__dirname)
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
        );
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        db[model.name] = model;
    });

// Establecer asociaciones entre modelos si están definidas
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

// Agregar Sequelize y db al objeto exportado
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
