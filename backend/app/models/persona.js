'use strict';

module.exports = (sequelize, DataTypes) =>{
    const persona = sequelize.define('persona', {
        apellidos: {type: DataTypes.STRING(150), defaultValue:"NONE"},
        nombres: {type: DataTypes.STRING(150), defaultValue:"NONE"},
        celular: {type: DataTypes.STRING(20), defaultValue:"NONE"},
        fecha_nacimiento:{type: DataTypes.DATEONLY},
        external_id:{type:DataTypes.UUID, defaultValue: DataTypes.UUIDV4}
    },{freezeTableName: true, timestamps: false});
    persona.associate = function(models){
        persona.hasOne(models.cuenta,{foreignKey:'id_persona', as:'cuenta'});
        persona.hasMany(models.entrenamiento,{foreignKey:'id_persona',as:'entrenamiento'});
        persona.belongsTo(models.rol,{foreignKey:'id_rol'});
        
    }
    return persona;
}