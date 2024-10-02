'use strict';

module.exports = (sequelize, DataTypes) =>{
    const ejercicio = sequelize.define('ejercicio', {
        nombre: {type: DataTypes.STRING(150), defaultValue:"NONE"},
        external_id:{type:DataTypes.UUID, defaultValue: DataTypes.UUIDV4}
    },{freezeTableName: true, timestamps: false});
    ejercicio.associate = function(models){
        ejercicio.belongsTo(models.entrenamiento,{foreignKey:'id_entrenamiento', as:'entrenamiento'});
        ejercicio.hasMany(models.serie, {foreignKey:'id_ejercicio', as:'serie'});

    }
    return ejercicio;
}