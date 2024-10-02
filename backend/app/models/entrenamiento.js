'use strict';

module.exports = (sequelize, DataTypes) =>{
    const entrenamiento = sequelize.define('entrenamiento', {
        fecha:{type: DataTypes.DATEONLY},
        external_id:{type:DataTypes.UUID, defaultValue: DataTypes.UUIDV4}
    },{freezeTableName: true, timestamps: false});
    entrenamiento.associate = function(models){
        entrenamiento.belongsTo(models.persona,{foreignKey:'id_persona',as:'persona'});
        entrenamiento.hasMany(models.ejercicio, {foreignKey:'id_entrenamiento', as:'ejercicio'});
        
    }
    return entrenamiento;
}