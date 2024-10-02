'use strict';

module.exports = (sequelize, DataTypes) =>{
    const lugar = sequelize.define('lugar',{ //Primero el nombre de la clase y entre llaves sus atributos
        nombre: {type: DataTypes.STRING(150), defaultValue:"NONE"},
        longitud: {type: DataTypes.FLOAT, defaultValue: 0.0},
        latitud: {type: DataTypes.FLOAT, defaultValue: 0.0},
        tipo_lugar: { type: DataTypes.ENUM('Parque', 'Clinica', 'Supermercado', 'Universidad', 'Restaurante') },
        external_id:{type:DataTypes.UUID, defaultValue: DataTypes.UUIDV4}
    },{freezeTableName: true, timestamps:false});
    return lugar;
}